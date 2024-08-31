import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import { ThemeProvider } from "next-themes";
import Login from "@/pages/Auth/Login.tsx";
import Signup from "@/pages/Auth/Signup.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Users from "@/pages/Users";
import UserForm from "@/pages/Users/form";
import ProfileLayout from "@/pages/Profile/Layout";
import PageTransition from "@/components/PageTransition.tsx";
import AuthLayout from "@/components/layouts/AuthLayout";
import AdminDashboard from "@/components/layouts/AdminDashboard";
import { AnimatePresence } from "framer-motion";
import { TRecord } from "@/interfaces";
import {Toaster} from "@/components/ui/sonner.tsx";

type TRouteObject = Omit<RouteObject, "children"> & {
  animate: boolean;
  data?: TRecord;
  children?: TRouteObject[]; // Recursive type for nested routes
};

const routes: TRouteObject[] = [
  {
    path: "/admin",
    element: <AuthLayout />,
    animate: false,
    children: [
      {
        path: "login",
        element: <Login />,
        animate: true,
      },
      {
        path: "signup",
        element: <Signup />,
        animate: true,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    animate: false,
    id: "admin",
    data: { title: "Admin" },
    children: [
      {
        path: "",
        element: <Dashboard />,
        id: "admin.home",
        data: { title: "Dashboard" },
        animate: true,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        animate: false,
        id: "admin.profile",
        data: { title: "Profile" },
        children: [
          {
            path: "",
            element: <>Basic Detail</>,
            id: "admin.profile.basic",
            data: { title: "Basic Profile" },
            animate: true,
          },
          {
            id: "admin.profile.account",
            path: "account",
            element: <>Account</>,
            data: { title: "Account Profile" },
            animate: true,
          },
          {
            id: "admin.profile.appearance",
            path: "appearance",
            element: <>Appearance</>,
            data: { title: "Profile Appearance" },
            animate: true,
          },
          {
            id: "admin.profile.notification",
            path: "notifications",
            element: <>Notifications</>,
            data: { title: "Profile Notifications" },
            animate: true,
          },
          {
            id: "admin.profile.display",
            path: "display",
            element: <>Display</>,
            data: { title: "Display Profile" },
            animate: true,
          },
        ],
      },
      {
        path: "users",
        data: { title: "Users" },
        element: <Users />,
        animate: true,
        id: "admin.users",
        children: [
          {
            id: "admin.users.create",
            data: { title: "Create User" },
            path: "create",
            element: <UserForm />,
            animate: false,
          },
        ],
      },
    ],
  },
];

const buildRouter = (routes: TRouteObject[]): RouteObject[] => {
  return routes.map((route) => ({
    ...route,
    element: route.animate ? (
      <PageTransition id={route.id || ""}>{route.element}</PageTransition>
    ) : (
      route.element
    ),
    loader: route.data ? () => route.data : undefined,
    children:
      route.children && route.children.length > 0
        ? buildRouter(route.children)
        : [],
  })) as RouteObject[];
};

const router = createBrowserRouter(buildRouter(routes), {
  basename: "/",
});

const Routes: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
      <Toaster position={'top-right'} visibleToasts={5}/>
    </ThemeProvider>
  );
};

export default Routes;
