import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { rootStates } from "@/store/root/slice";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Index: React.FC = () => {
  const { currentRoute } = useSelector(rootStates);

  const items = [
    {
      title: "Profile",
      href: "",
      id: "admin.profile.basic",
    },
    {
      title: "Change Password",
      href: "change-password",
      id: "admin.profile.change-password",
    },
  ];
  return (
    <>
      <div className="space-y-4 p-3 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <nav
              className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"
              )}
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    buttonVariants({
                      variant:
                        currentRoute.id === item.id ? "default" : "ghost",
                    }),
                    currentRoute.id === item.id
                      ? "bg-primary hover:bg-primary"
                      : "hover:bg-transparent hover:underline",
                    "justify-start"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
