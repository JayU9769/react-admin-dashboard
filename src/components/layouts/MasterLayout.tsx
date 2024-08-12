import React from "react";
import {useLocation} from "react-router-dom";
import {authRoutes} from "@/lib/constants.ts";
import AuthLayout from "@/components/layouts/AuthLayout";
import AdminDashboard from "@/components/layouts/AdminDashboard";

const Index: React.FC = () => {
  const { pathname } = useLocation();
  const shouldShowAuthLayout = authRoutes.some(route => pathname.includes(route));

  return <>
    {shouldShowAuthLayout ? <AuthLayout /> : <AdminDashboard />}
  </>
}

export default Index;