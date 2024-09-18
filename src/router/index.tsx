import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import React, { lazy } from "react";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { TRecord } from "@/interfaces";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/PageTransition";
import AuthLayout from "@/components/layouts/AuthLayout";
import AdminDashboard from "@/components/layouts/AdminDashboard";

import UserForm from "@/pages/Users/form";
import RoleForm from "@/pages/Roles/form";
import AdminForm from "@/pages/Admins/form";

// Lazy-loaded components
const Login = lazy(() => import("@/pages/Auth/Login.tsx"));
const Signup = lazy(() => import("@/pages/Auth/Signup.tsx"));
const Dashboard = lazy(() => import("@/pages/Dashboard.tsx"));
const Users = lazy(() => import("@/pages/Users"));
const Roles = lazy(() => import("@/pages/Roles"));
const Admins = lazy(() => import("@/pages/Admins"));
const ProfileLayout = lazy(() => import("@/pages/Profile/Layout"));

type TRouteObject = Omit<RouteObject, "children"> & {
  animate: boolean;
  data?: TRecord;
  children?: TRouteObject[]; // Recursive type for nested routes
};

const routes: TRouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    animate: false,
    children: [
      {
        path: "",
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
          {
            id: "admin.users.edit",
            data: { title: "Edit User" },
            path: "edit/:id",
            element: <UserForm />,
            animate: false,
          },
        ],
      },
      {
        path: "roles",
        data: { title: "Roles" },
        element: <Roles />,
        animate: true,
        id: "admin.roles",
        children: [
          {
            id: "admin.roles.create",
            data: { title: "Create Role" },
            path: "create",
            element: <RoleForm />,
            animate: false,
          },
          {
            id: "admin.roles.edit",
            data: { title: "Edit Role" },
            path: "edit/:id",
            element: <RoleForm />,
            animate: false,
          },
        ],
      },
      {
        path: "list",
        data: { title: "Admins" },
        element: <Admins />,
        animate: true,
        id: "admin.admins",
        children: [
          {
            id: "admin.admins.create",
            data: { title: "Create Admin" },
            path: "create",
            element: <AdminForm />,
            animate: false,
          },
          {
            id: "admin.admins.edit",
            data: { title: "Edit Admin" },
            path: "edit/:id",
            element: <AdminForm />,
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
      <Toaster position={"top-right"} visibleToasts={5} />
    </ThemeProvider>
  );
};

export default Routes;
