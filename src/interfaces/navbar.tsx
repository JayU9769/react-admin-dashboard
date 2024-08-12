import {LucideIcon} from "lucide-react";


export type INavItemVariant = "default" | "ghost";

export interface INavItem {
  title: string
  label?: string
  icon: LucideIcon
  variant: INavItemVariant
}