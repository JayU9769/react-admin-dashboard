import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface IProp {
  title?: ReactNode;
  description?: string;
  children: ReactNode;
  submitLabel?: string | ReactNode;
  closeLabel?: string | ReactNode;
  hideClose?: boolean;
  drawerHeaderClass?: string;
  size?: "sm" | "md" | "lg" | "xl" | "fullscreen";
  direction?: "right" | "left" | "bottom" | "top";
  onSubmit: () => void;
}

export interface DrawerRef {
  openDrawer: () => void;
  closeDrawer: () => void;
}

const Index = forwardRef<DrawerRef, IProp>(
  (
    {
      title,
      description,
      children,
      submitLabel = "Submit",
      closeLabel = "Cancel",
      hideClose = false,
      drawerHeaderClass = "",
      size = "4/12",
      direction = "right",
      onSubmit,
    },
    ref
  ) => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(true);

    useImperativeHandle(ref, () => ({
      openDrawer: () => setOpen(true),
      closeDrawer: () => setOpen(false),
    }));

    useEffect(() => {
      if (!open) {
        setTimeout(() => {
          navigate(-1);
        }, 300);
      }
    }, [navigate, open]);

    let directionClass: string = "";
    let sizeWidthClass: string = "w-4/12";
    let sizeHeightClass: string = "h-4/12";
    switch (size) {
      case "sm":
        sizeWidthClass = "w-2/12";
        sizeHeightClass = "h-2/12";
        break;
      case "lg":
        sizeWidthClass = "w-6/12";
        sizeHeightClass = "h-6/12";
        break;
      case "xl":
        sizeWidthClass = "w-8/12";
        sizeHeightClass = "h-8/12";
        break;
      case "fullscreen":
        sizeWidthClass = "w-full";
        sizeHeightClass = "h-full";
        break;
      default:
        break;
    }
    switch (direction) {
      case "right":
        directionClass = `h-screen top-0 right-0 left-auto ${sizeWidthClass}`;
        break;

      case "left":
        directionClass = `h-screen top-0 left-0 right-auto ${sizeWidthClass}`;
        break;

      case "top":
        directionClass = `w-full top-0 bottom-auto h-${sizeHeightClass}`;
        break;

      case "bottom":
        directionClass = `w-full bottom-0 top-auto h-${sizeHeightClass}`;
        break;

      default:
        break;
    }

    return (
      <Drawer open={open} direction={direction} dismissible={false}>
        <DrawerContent className={`${directionClass} mt-0 rounded-none`}>
          <DrawerHeader className={`${drawerHeaderClass}`}>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter className={""}>
            <Button type="button" onClick={onSubmit}>
              {submitLabel}
            </Button>
            {!hideClose && (
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  color="primary"
                  onClick={() => setOpen(false)}
                >
                  {closeLabel}
                </Button>
              </DrawerClose>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
);

export default Index;
