import React from "react";
import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {Link, useLocation} from "react-router-dom";
import {INavItem} from "@/interfaces/navbar.ts";

interface IProps {
  isCollapsed: boolean
  links: INavItem[]
}

const Index: React.FC<IProps> = ({links, isCollapsed = false}) => {

  const { pathname } = useLocation();

  return (
    <div
      data-collapsed={isCollapsed}
      className={`group flex flex-col gap-4 py-2 ${isCollapsed ? 'py-2' : ''}`}
    >
      <TooltipProvider delayDuration={0}>
        <nav className={`grid gap-1 px-2 ${isCollapsed ? 'justify-center px-2' : ''}`}>
          {links.map((link, index) =>
            isCollapsed ? (

              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    to={link.path}
                    className={cn(
                      buttonVariants({variant: link.path === pathname ? 'default' : 'ghost', size: "icon"}),
                      "h-9 w-9",
                      link.path === pathname &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4"/>
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
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
                  buttonVariants({variant: link.path === pathname ? 'default' : 'ghost', size: "sm"}),
                  link.path === pathname &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4"/>
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.path === pathname &&
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
  )
}

export default Index;