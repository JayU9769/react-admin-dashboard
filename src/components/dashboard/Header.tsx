import React, { useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import { PanelLeft, Search } from "lucide-react";
import { Link, useMatches } from "react-router-dom";
import Nav from "@/components/dashboard/Nav.tsx";
import { list } from "@/components/dashboard/NavList.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { useDispatch, useSelector } from "react-redux";
import { rootStates, setCurrentRoute } from "@/store/root/slice.ts";
import { AppDispatch } from "@/store";
import { Logo } from "./Logo";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

interface IProp {
  size?: string;
  direction?: "right" | "left" | "bottom" | "top";
}
const Index: React.FC<IProp> = ({ direction = "left" }) => {
  ///////////////////////// Redux States and Actions... /////////////////////////
  const dispatch = useDispatch<AppDispatch>();
  const { currentRoute } = useSelector(rootStates);

  const matches = useMatches();

  useEffect(() => {
    dispatch(setCurrentRoute(matches[matches.length - 1]));
  }, [matches]);

  let directionClass: string = "";
  switch (direction) {
    case "right":
      directionClass = `h-screen top-0 right-0 left-auto w-3/5`;
      break;

    case "left":
      directionClass = `h-screen top-0 left-0 right-auto w-3/5`;
      break;

    case "top":
      directionClass = `w-full top-0 bottom-auto h-full`;
      break;

    case "bottom":
      directionClass = `w-full bottom-0 top-auto h-full`;
      break;

    default:
      break;
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Drawer direction={direction}>
        <DrawerTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className={`${directionClass} mt-0 rounded-none`}>
          <nav className="grid gap-6 text-lg font-medium py-3 px-4 justify-center">
            <Logo />
          </nav>
          <Nav isCollapsed={false} links={list} />
        </DrawerContent>
      </Drawer>
      <div className="hidden md:flex flex-col">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {currentRoute.data ? (currentRoute.data as any).title : "Dashboard"}
        </h4>
        <Breadcrumb>
          <BreadcrumbList>
            {matches.map((match, index) => {
              const isLast = !!matches[index + 1];
              const data: any = match.data;
              const title = data && data.title ? data.title : match.id;
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      {isLast ? (
                        <Link to={match.pathname}>{title}</Link>
                      ) : (
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                      )}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img
              src="https://ui.shadcn.com/_next/image?url=%2Fplaceholder-user.jpg&w=48&q=75"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Index;
