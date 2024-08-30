import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import { rootStates } from "@/store/root/slice.ts";
import { useSelector } from "react-redux";
import Header from "@/components/dashboard/Header";

const Index: React.FC = () => {
  ///////////////////////// Redux States and Actions... /////////////////////////
  const { isCollapsed } = useSelector(rootStates);
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
