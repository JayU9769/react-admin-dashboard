import Sidebar from "@/components/dashboard/Sidebar";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { rootStates } from "@/store/root/slice.ts";
import { useSelector } from "react-redux";
import Header from "@/components/dashboard/Header";
import { useGetAuthQuery } from "@/store/admin/api";
import { adminStates } from "@/store/admin/slice";

const Index: React.FC = () => {
  ///////////////////////// Redux States and Actions... /////////////////////////
  const { isCollapsed } = useSelector(rootStates);
  const { isError } = useGetAuthQuery();
  const navigate = useNavigate();
  const { auth } = useSelector(adminStates);
  useEffect(() => {
    if (auth.id) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div
          className={`flex flex-col sm:gap-4 sm:py-4 sm:pl-14  ${
            isCollapsed ? "sm:pl-14" : "sm:pl-[240px]"
          } transition-all`}
        >
          <Header />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
