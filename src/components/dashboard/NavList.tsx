import {Home, Package, ShoppingCart, Users2} from "lucide-react";
import {INavItem} from "@/interfaces/navbar.ts";

export const list: INavItem[] = [
  {
    title: "Home",
    icon: Home,
    path: '/admin'
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    path: '/admin/orders'
  },
  {
    title: "Products",
    icon: Package,
    path: '/admin/products'
  },
  {
    title: "Users",
    icon: Users2,
    path: '/admin/users'
  }
]