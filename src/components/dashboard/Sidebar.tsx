import React from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import Nav from "@/components/dashboard/Nav.tsx";
import { list } from "@/components/dashboard/NavList.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { rootStates, setIsCollapsed } from "@/store/root/slice.ts";
import { Logo, LogoMini } from "./Logo";

const Index: React.FC = () => {
  ///////////////////////// Redux States and Actions... /////////////////////////
  const dispatch = useDispatch<AppDispatch>();
  const { isCollapsed } = useSelector(rootStates);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 m-2 hidden flex-col border border-r rounded-lg bg-background sm:flex ${
        isCollapsed ? "w-14" : "w-[240px]"
      } transition-all`}
    >
      <nav className={`flex flex-col ${isCollapsed ? "sidebar-mini" : ""}`}>
        <div className="sidebar-brand">
          <Logo />
          <LogoMini />
        </div>
        <Button
          size="icon"
          className="p-1 h-6 w-6 rounded-full absolute top-[42px] right-[-12px]"
          onClick={() => dispatch(setIsCollapsed(!isCollapsed))}
        >
          {isCollapsed ? (
            <ChevronsRight className="transition-all group-hover:scale-110 rounded-full" />
          ) : (
            <ChevronsLeft className="transition-all group-hover:scale-110 rounded-full" />
          )}
        </Button>
        <Nav isCollapsed={isCollapsed} links={list} />
      </nav>
    </aside>
  );
};

export default Index;
