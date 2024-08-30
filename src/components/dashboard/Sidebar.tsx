import React from "react";
import { Link } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import Nav from "@/components/dashboard/Nav.tsx";
import { list } from "@/components/dashboard/NavList.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { rootStates, setIsCollapsed } from "@/store/root/slice.ts";

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
      <nav
        className={`flex flex-col ${
          isCollapsed ? "items-center px-2" : ""
        } gap-4 sm:py-4`}
      >
        <Link
          to={"/admin"}
          className={`group flex ${
            isCollapsed ? "" : "ms-2"
          }  shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base`}
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Button
          size="icon"
          className="p-1 h-6 w-6 rounded-full absolute top-[45px] right-[-12px]"
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
