import {Home, LineChart, Package, ShoppingCart, Users2} from "lucide-react";
import {INavItem} from "@/interfaces/navbar.tsx";

export const list: INavItem[] = [
  {
    title: "Home",
    icon: Home,
    variant: "default",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    variant: "ghost",
  },
  {
    title: "Products",
    icon: Package,
    variant: "ghost",
  },
  {
    title: "Customers",
    label: "23",
    icon: Users2,
    variant: "ghost",
  },
  {
    title: "Analytics",
    label: "",
    icon: LineChart,
    variant: "ghost",
  },
]