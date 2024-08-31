import React, {useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {EllipsisVertical, ListChecks, Trash2} from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog.tsx";
import {TActionType, TIds} from "@/interfaces";

interface IProps {
  type: TActionType;
  ids: TIds;
}

const Index: React.FC<IProps> = ({type, ids}) => {

  const [model, setModel] = useState(false);

  return <>
    <DropdownMenu>
      {(type === 'bulk' && ids.length > 0) && <DropdownMenuTrigger asChild>
        <Button variant="outline" size={`sm`} className={`gap-2`}>
          <ListChecks className={`h-4 w-4`}/>
          Actions
          <span
            className={`font-bold`}>
            ( {ids.includes('all') ? 'All' : ids.length} )
          </span>
        </Button>
      </DropdownMenuTrigger>}
      {type === 'single' &&
        <DropdownMenuTrigger asChild>
          <Button variant="link" size={`sm`} className={`gap-2 text-muted-foreground`}>
            <EllipsisVertical className={`h-4 w-4`}/>
          </Button>
        </DropdownMenuTrigger>
      }
      <DropdownMenuContent className="w-56">
        { type === 'bulk' && <>
          <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
          <DropdownMenuSeparator/>
        </> }
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
    }}/>
  </>
}

export default Index;