import { Home, Users2, UserCog, ShipWheel, FolderLock } from "lucide-react";
import { INavItem } from "@/interfaces/navbar.ts";

export const list: INavItem[] = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    path: "/admin",
    permissionName: 'admin-dashboard'
  },
  {
    id: "users",
    title: "Users",
    icon: Users2,
    path: "/admin/users",
    permissionName: 'user-view'
  },
  {
    id: "roles",
    title: "Roles",
    icon: UserCog,
    path: "/admin/roles",
    permissionName: 'role-view'
  },
  {
    id: "admins",
    title: "Admins",
    icon: ShipWheel,
    path: "/admin/list",
    permissionName: 'admin-view'
  },
  {
    id: "permissions",
    title: "Permissions",
    icon: FolderLock,
    path: "/admin/permissions",
    permissionName: 'admin-permission'
  },
];
