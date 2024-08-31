import { LucideIcon } from "lucide-react";

export type INavItemVariant = "default" | "ghost";

export interface INavItem {
  id: string;
  title: string;
  label?: string;
  icon: LucideIcon;
  path: string;
}
