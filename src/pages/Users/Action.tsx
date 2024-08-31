import React, {useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {EllipsisVertical, Trash2} from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog.tsx";

const Index: React.FC = () => {
  const [model, setModel] = useState(false);
  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size={`sm`} className={`gap-2 text-muted-foreground`}>
          <EllipsisVertical className={`h-4 w-4`}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setModel(!model)}>
            Delete
            <DropdownMenuShortcut><Trash2 className={`h-4 w-4`}/></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>In-Active</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

    <ConfirmDialog open={model} onClose={() => setModel(false)} callBack={() => {
      console.log("Confirm modal");
    }} />
  </>
}

export default Index;