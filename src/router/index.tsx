import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';
import {ThemeProvider} from "next-themes";
import Login from "@/pages/Auth/Login.tsx";
import MasterLayout from "@/components/layouts/MasterLayout.tsx";
import Signup from "@/pages/Auth/Signup.tsx";
import Dashboard from "@/pages/Dashboard.tsx";

const router = createBrowserRouter([
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
      }
    ]
  }
], {
  basename: "/"
});

const Routes: React.FC = () => {

  return <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
  </ThemeProvider>
};

export default Routes;
