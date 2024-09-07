import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { EllipsisVertical, ListChecks, SquarePen, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog.tsx";
import { TActionType, TIds } from "@/interfaces";
import { useDeleteUserMutation } from "@/store/user/api.ts";
import { showAlert } from "@/components/ui/sonner.tsx";
import { useNavigate } from "react-router-dom";

interface IProps {
  type: TActionType;
  ids: TIds;
}

const Index: React.FC<IProps> = ({ type, ids }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const navigate = useNavigate();
  const [model, setModel] = useState(false);

  return (
    <>
      <DropdownMenu>
        {type === "bulk" && ids.length > 0 && (
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={`sm`} className={`gap-2`}>
              <ListChecks className={`h-4 w-4`} />
              Actions
            </Button>
          </DropdownMenuTrigger>
        )}
        {type === "single" && (
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              size={`sm`}
              className={`gap-2 text-muted-foreground`}
            >
              <EllipsisVertical className={`h-4 w-4`} />
            </Button>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent className="w-56">
          {type === "bulk" && (
            <>
              <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setModel(!model)}>
              Delete
              <DropdownMenuShortcut>
                <Trash2 className={`h-4 w-4`} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            {type === "single" && (
              <DropdownMenuItem onClick={() => navigate(`edit/${ids[0]}`)}>
                Edit
                <DropdownMenuShortcut>
                  <SquarePen className={`h-4 w-4`} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
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

      <ConfirmDialog
        open={model}
        isLoading={isLoading}
        onClose={() => setModel(false)}
        callBack={async () => {
          deleteUser(ids as any).then((res) => {
            if (res.data) {
              showAlert("Deleted Successfully", "success");
              setModel(false);
            }
            if (res.error) {
              showAlert(
                (res.error as any).data.message || "Internal server error",
                "error"
              );
            }
          });
        }}
      />
    </>
  );
};

export default Index;
