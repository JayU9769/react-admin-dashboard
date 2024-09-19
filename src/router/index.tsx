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
import { useSelector } from "react-redux";
import { rootStates } from "@/store/root/slice.ts";
import ErrorComponent from "@/components/ErrorComponent.tsx";

import UserForm from "@/pages/Users/form";
import RoleForm from "@/pages/Roles/form";
import AdminForm from "@/pages/Admins/form";
import BasicProfile from "@/pages/Profile/Forms/BasicProfile";
import ChangePassword from "@/pages/Profile/Forms/ChangePassword";
import DeleteAccount from "@/pages/Profile/Forms/DeleteAccount";

// Lazy-loaded components
const Login = lazy(() => import("@/pages/Auth/Login.tsx"));
const Signup = lazy(() => import("@/pages/Auth/Signup.tsx"));
const Dashboard = lazy(() => import("@/pages/Dashboard.tsx"));
const Users = lazy(() => import("@/pages/Users"));
const Permissions = lazy(() => import("@/pages/Permissions"));
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
            element: <BasicProfile />,
            id: "admin.profile.basic",
            data: { title: "Basic Profile" },
            animate: true,
          },
          {
            id: "admin.profile.change-password",
            path: "change-password",
            element: <ChangePassword />,
            data: { title: "Change Password" },
            animate: true,
          },
          {
            id: "admin.profile.delete-account",
            path: "delete-account",
            element: <DeleteAccount />,
            data: { title: "Delete Account" },
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
        path: "role",
        data: { title: "Roles" },
        element: <Roles />,
        animate: true,
        id: "admin.role",
        children: [
          {
            id: "admin.role.create",
            data: { title: "Create Role" },
            path: "create",
            element: <RoleForm />,
            animate: false,
          },
          {
            id: "admin.role.edit",
            data: { title: "Edit Role" },
            path: "edit/:id",
            element: <RoleForm />,
            animate: false,
          },
        ],
      },
      {
        path: "permissions",
        data: { title: "Permissions" },
        element: <Permissions />,
        animate: true,
        id: "admin.permissions",
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
  const { error } = useSelector(rootStates);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AnimatePresence mode="wait">
        {error.statusCode !== 0 ? (
          <ErrorComponent />
        ) : (
          <RouterProvider router={router} />
        )}
      </AnimatePresence>
      <Toaster position={"top-right"} visibleToasts={5} />
    </ThemeProvider>
  );
};

export default Routes;
