import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const Index: React.FC = () => {
  const [goal, setGoal] = React.useState(350);
  const navigate = useNavigate();

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  const closeDrawer = () => {
    console.log("test");
    navigate(-1);
  };
  return (
    <Drawer open={true} direction="right" onOpenChange={closeDrawer}>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[80%] rounded-none">
        <div>
          <DrawerHeader className={""}>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="default"
                color="primary"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
              >
                -<span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="default"
                color="primary"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
              >
                +<span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]"></div>
          </div>
          <DrawerFooter className={""}>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="default" color="primary">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
