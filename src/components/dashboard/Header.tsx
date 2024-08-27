import React from "react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Package2, PanelLeft, Search} from "lucide-react";
import {Link} from "react-router-dom";
import Nav from "@/components/dashboard/Nav.tsx";
import {list} from "@/components/dashboard/NavList.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useSelector} from "react-redux";
import {rootStates} from "@/store/root/slice.ts";


const Index: React.FC = () => {

  ///////////////////////// Redux States and Actions... /////////////////////////
  const {
    pageTitle,
  } = useSelector(rootStates);


  return <header
    className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5"/>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs p-0">
        <nav className="grid gap-6 text-lg font-medium mt-2 ms-2 mb-4">
          <Link
            to={"/admin"}
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110"/>
            <span className="sr-only">Acme Inc</span>
          </Link>
        </nav>
        <Nav
          isCollapsed={false}
          links={list}
        />
      </SheetContent>
    </Sheet>
    <div className="hidden md:flex">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        { pageTitle }
      </h4>
    </div>
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
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
        <DropdownMenuSeparator/>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
}

export default Index;