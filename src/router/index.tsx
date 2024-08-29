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
import ProfileLayout from "@/pages/Profile/Layout";
import PageTransition from "@/components/PageTransition.tsx";
import AuthLayout from "@/components/layouts/AuthLayout";
import AdminDashboard from "@/components/layouts/AdminDashboard";
import {AnimatePresence} from "framer-motion";


type TRouteObject = Omit<RouteObject, 'children'> & {
  animate: boolean,
  children?: TRouteObject[]; // Recursive type for nested routes
};

const routes: TRouteObject[] = [
  {
    path: "/admin",
    element: <AuthLayout/>,
    animate: false,
    children: [
      {
        path: "login",
        element: <Login/>,
        animate: true,
      },
      {
        path: "signup",
        element: <Signup/>,
        animate: true,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard/>,
    animate: false,
    children: [
      {
        path: "",
        element: <Dashboard/>,
        animate: true,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        animate: false,
        children: [
          {
            path: "",
            element: <>Basic Detail</>,
            animate: true,
          },
          {
            path: "account",
            element: <>Account</>,
            animate: true,
          },
          {
            path: "appearance",
            element: <>Appearance</>,
            animate: true,
          },
          {
            path: "notifications",
            element: <>Notifications</>,
            animate: true,
          },
          {
            path: "display",
            element: <>Display</>,
            animate: true,
          },
        ],
      },
      {
        path: "users",
        element: <Users/>,
        animate: true,
        children: [
          {
            path: "create",
            element: <UserForm/>,
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
    element: route.animate ? <PageTransition>{route.element}</PageTransition> : route.element,
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
      <AnimatePresence mode="wait">
        <RouterProvider router={router}/>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
