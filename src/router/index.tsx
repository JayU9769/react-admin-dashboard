import {createBrowserRouter, RouteObject, RouterProvider} from 'react-router-dom';
import React from 'react';
import {ThemeProvider} from "next-themes";
import Login from "@/pages/Auth/Login.tsx";
import MasterLayout from "@/components/layouts/MasterLayout.tsx";
import Signup from "@/pages/Auth/Signup.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Users from "@/pages/Users";
import PageTransition from "@/components/PageTransition.tsx";


const routes: RouteObject[] = [
  {
    path: '/admin',
    element: <MasterLayout/>,
    children: [
      {
        path: '',
        element: <Dashboard/>,
      },
      {
        path: 'login',
        element: <Login/>,
      },
      {
        path: 'signup',
        element: <Signup/>,
      },
      {
        path: 'users',
        element: <Users/>,
      }
    ]
  }
];

const buildRouter = (routes: RouteObject[]) : RouteObject[] => {
  return routes.map((route) => ({
    ...route,
    element: !route.children ? <PageTransition>{ route.element }</PageTransition> : route.element,
    children: route.children && route.children.length > 0 ? buildRouter(route.children) : []
  })) as RouteObject[];
}

const router = createBrowserRouter(buildRouter(routes), {
  basename: "/"
});

const Routes: React.FC = () => {

  return <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
  </ThemeProvider>
};

export default Routes;
