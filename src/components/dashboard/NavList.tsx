import { Home, Package, ShoppingCart, Users2, User } from "lucide-react";
import { INavItem } from "@/interfaces/navbar.ts";

export const list: INavItem[] = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    path: "/admin",
  },
  {
    id: "orders",
    title: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },
  {
    id: "products",
    title: "Products",
    icon: Package,
    path: "/admin/products",
  },
  {
    id: "users",
    title: "Users",
    icon: Users2,
    path: "/admin/users",
  },
  {
    id: "profile",
    title: "Profile",
    icon: User,
    path: "/admin/profile",
  },
];
