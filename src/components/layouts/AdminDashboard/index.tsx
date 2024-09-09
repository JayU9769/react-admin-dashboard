import Sidebar from "@/components/dashboard/Sidebar";
import React, { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { rootStates } from "@/store/root/slice.ts";
import { useSelector } from "react-redux";
import Header from "@/components/dashboard/Header";
import Cookies from "js-cookie";
import axios from "axios";

const Index: React.FC = () => {
  ///////////////////////// Redux States and Actions... /////////////////////////
  const { isCollapsed } = useSelector(rootStates);

  const navigate = useNavigate();

  const authCheck = useCallback(async () => {
    const sessionCookie = Cookies.get("connect.sid");
    console.log(sessionCookie);
    if (!sessionCookie) {
      // return navigate("/");
    }

    try {
      const response = await axios.get("http://localhost:3000/admins/profile", {
        withCredentials: true,
      });

      console.log(response);
    } catch (e) {
      console.log(e);
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

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
