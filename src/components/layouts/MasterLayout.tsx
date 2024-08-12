import React from "react";
import {useLocation} from "react-router-dom";
import {authRoutes} from "@/lib/constants.ts";
import AuthLayout from "@/components/layouts/AuthLayout";
import AdminDashboard from "@/components/layouts/AdminDashboard";
import {Toaster} from "@/components/ui/sonner.tsx";

const Index: React.FC = () => {
  const { pathname } = useLocation();
  const shouldShowAuthLayout = authRoutes.some(route => pathname.includes(route));

  return <>
    {shouldShowAuthLayout ? <AuthLayout /> : <AdminDashboard />}
    <Toaster position={'top-right'} visibleToasts={5} />
  </>
}

export default Index;