import React from "react";
import { useTheme } from "next-themes"
import { ExternalToast, toast, Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

type ToastTypes = 'success' | 'info' | 'warning' | 'error' | 'default';

export const showAlert = (message: string, variant: ToastTypes = 'default' , onAction?: () => void) => {

  const data: ExternalToast = {
    description: message,
    action: {
      label: 'X',
      onClick: () => onAction,
    },
  };

  switch (variant) {
    case "success":
      toast.success("Success", data);
      break;
    case "error":
      toast.error("Error", data);
      break;
    case "warning":
      toast.warning("Warning", data);
      break;
    case "info":
      toast.info("Info", data);
      break;
    default:
      toast("Success", data);
      break
  }

}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
