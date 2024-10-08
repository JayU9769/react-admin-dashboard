import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { INavItem } from "@/interfaces/navbar.ts";
import { useSelector } from "react-redux";
import { rootStates } from "@/store/root/slice.ts";
import {adminStates} from "@/store/admin/slice.ts";

interface IProps {
  isCollapsed: boolean;
  links: INavItem[];
}

const Index: React.FC<IProps> = ({ links, isCollapsed = false }) => {
  const { currentRoute } = useSelector(rootStates);
  const { auth } = useSelector(adminStates);
  return (
    <div
      data-collapsed={isCollapsed}
      className={`group border-t flex flex-col gap-4 py-3 ${
        isCollapsed ? "" : ""
      }`}
    >
      <TooltipProvider delayDuration={0}>
        <nav
          className={`grid gap-1 px-3 ${
            isCollapsed ? "justify-center px-2" : ""
          }`}
        >
          {links.filter(l => auth.permissions.includes(l.permissionName)).map((link, index) =>
            isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={link.path}
                    className={cn(
                      buttonVariants({
                        variant: currentRoute.id.includes(link.id)
                          ? "default"
                          : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      currentRoute.id.includes(link.id) &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                to={link.path}
                className={cn(
                  buttonVariants({
                    variant: currentRoute.id.includes(link.id)
                      ? "default"
                      : "ghost",
                    size: "default",
                  }),
                  currentRoute.id.includes(link.id) &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      currentRoute.id.includes(link.id) &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </TooltipProvider>
    </div>
  );
};

export default Index;
