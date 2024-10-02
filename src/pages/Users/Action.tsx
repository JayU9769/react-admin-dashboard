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
import { EllipsisVertical, Key, ListChecks, SquarePen, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog.tsx";
import { TActionType, TIds } from "@/interfaces";
import { useDeleteUserMutation, useUpdateUserActionMutation } from "@/store/user/api.ts";
import { showAlert } from "@/components/ui/sonner.tsx";
import { useNavigate } from "react-router-dom";
import usePermission from "@/hooks/usePermissions";

interface IProps {
  type: TActionType;
  ids: TIds;
  onDelete?: () => void;
  onUpdateAction?: () => void;
}

const Index: React.FC<IProps> = ({ type, ids, onDelete, onUpdateAction }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [updateAction] = useUpdateUserActionMutation();
  const navigate = useNavigate();
  const [model, setModel] = useState(false);
  const hasDeletePermission = usePermission("user-delete");
  const hasUpdatePermission = usePermission("user-update");

  const handleDeleteAction = () => {
    deleteUser(ids).then((res) => {
      if (res.data) {
        showAlert("Deleted Successfully", "success");
        setModel(false);
        if (onDelete) onDelete();
      }
      if (res.error) {
        showAlert((res.error as any).data.message || "Internal server error", "error");
      }
    });
  };

  const handleUpdateStatusAction = (status: number) => {
    updateAction({
      ids,
      field: {
        name: "status",
        value: status,
      },
    }).then((res) => {
      if (res.data) {
        showAlert("Status updated successfully", "success");
        if (onUpdateAction) onUpdateAction();
      }
      if (res.error) {
        showAlert((res.error as any).data.message || "Internal server error", "error");
      }
    });
  };

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
            <Button variant="link" size={`sm`} className={`gap-2 text-muted-foreground`}>
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
            {hasDeletePermission && (
              <DropdownMenuItem onClick={() => setModel(!model)}>
                Delete
                <DropdownMenuShortcut>
                  <Trash2 className={`h-4 w-4`} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
            {type === "single" && (
              <>
                {hasUpdatePermission && (
                  <DropdownMenuItem onClick={() => navigate(`edit/${ids[0]}`)}>
                    Edit
                    <DropdownMenuShortcut>
                      <SquarePen className={`h-4 w-4`} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => navigate(`change-password/${ids[0]}`)}>
                  Change Password
                  <DropdownMenuShortcut>
                    <Key className={`h-4 w-4`} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleUpdateStatusAction(1)}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatusAction(0)}>In-Active</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {hasDeletePermission && <ConfirmDialog open={model} isLoading={isLoading} onClose={() => setModel(false)} callBack={handleDeleteAction} />}
    </>
  );
};

export default Index;
