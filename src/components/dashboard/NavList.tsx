import { Home, Users2, UserCog, ShipWheel, FolderLock } from "lucide-react";
import { INavItem } from "@/interfaces/navbar.ts";

export const list: INavItem[] = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    path: "/admin",
  },
  {
    id: "users",
    title: "Users",
    icon: Users2,
    path: "/admin/users",
  },
  {
    id: "role",
    title: "Roles",
    icon: UserCog,
    path: "/admin/role",
  },
  {
    id: "admins",
    title: "Admins",
    icon: ShipWheel,
    path: "/admin/list",
  },
  {
    id: "permissions",
    title: "Permissions",
    icon: FolderLock,
    path: "/admin/permissions",
  },
];
