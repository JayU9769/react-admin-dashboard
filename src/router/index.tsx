import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import {ThemeProvider} from "next-themes";
import Login from "@/pages/Auth/Login.tsx";
import Signup from "@/pages/Auth/Signup.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Users from "@/pages/Users";
import UserForm from "@/pages/Users/form";
import PageTransition from "@/components/PageTransition.tsx";
import AuthLayout from "@/components/layouts/AuthLayout";
import AdminDashboard from "@/components/layouts/AdminDashboard";

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: <AuthLayout/>,
    id: 'Dashboard',
    children: [
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "signup",
        element: <Signup/>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard/>,
    children: [
      {
        path: "",
        element: <Dashboard/>,
      },
      {
        path: "users",
        element: <Users/>,
        children: [
          {
            path: "create",
            element: <UserForm/>,
          },
        ],
      },
    ],
  },
];

const buildRouter = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => ({
    ...route,
    element: !route.children ? (
      <PageTransition>{route.element}</PageTransition>
    ) : (
      route.element
    ),
    children:
      route.children && route.children.length > 0
        ? buildRouter(route.children)
        : [],
  })) as RouteObject[];
};

const router = createBrowserRouter(
  buildRouter(routes),
  {
    basename: "/",
  }
);

const Routes: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
};

export default Routes;
