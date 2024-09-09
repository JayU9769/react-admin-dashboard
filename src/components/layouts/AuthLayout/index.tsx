import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const sessionCookie = Cookies.get("connect.sid");
    if (sessionCookie) {
      return navigate("/admin");
    }
  }, [navigate]);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Outlet />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/assets/auth/login-bg.jpg"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
