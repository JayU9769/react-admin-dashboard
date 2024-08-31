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
  size?: string;
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
      size = "30%",
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
    switch (direction) {
      case "right":
        directionClass = `h-screen top-0 right-0 left-auto w-[${size}]`;
        break;

      case "left":
        directionClass = `h-screen top-0 left-0 right-auto w-[${size}]`;
        break;

      case "top":
        directionClass = `w-full top-0 bottom-auto h-[${size}]`;
        break;

      case "bottom":
        directionClass = `w-full bottom-0 top-auto h-[${size}]`;
        break;

      default:
        break;
    }

    return (
      <Drawer
        open={open}
        direction={direction}
        onOpenChange={() => setOpen(false)}
      >
        <DrawerContent className={`${directionClass} mt-0 rounded-none`}>
          <DrawerHeader className={`${drawerHeaderClass}`}>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          {children}
          <DrawerFooter className={""}>
            <Button type="button" onClick={onSubmit}>
              {submitLabel}
            </Button>
            {!hideClose && (
              <DrawerClose asChild>
                <Button variant="outline" color="primary">
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
