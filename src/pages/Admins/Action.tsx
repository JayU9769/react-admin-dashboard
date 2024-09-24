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
import {
  EllipsisVertical,
  Key,
  ListChecks,
  SquarePen,
  Trash2,
} from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog.tsx";
import { TActionType, TIds } from "@/interfaces";
import { useDeleteAdminMutation } from "@/store/admin/api.ts";
import { showAlert } from "@/components/ui/sonner.tsx";
import { useNavigate } from "react-router-dom";
import { adminStates } from "@/store/admin/slice";
import { useSelector } from "react-redux";

interface IProps {
  type: TActionType;
  ids: TIds;
  onDelete?: () => void;
}

const Index: React.FC<IProps> = ({ type, ids, onDelete }) => {
  const [deleteRecored, { isLoading }] = useDeleteAdminMutation();
  const navigate = useNavigate();
  const [model, setModel] = useState(false);
  const { auth } = useSelector(adminStates);
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
            {!ids.includes(auth.id) && (
              <DropdownMenuItem onClick={() => setModel(!model)}>
                Delete
                <DropdownMenuShortcut>
                  <Trash2 className={`h-4 w-4`} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
            {type === "single" && (
              <>
                <DropdownMenuItem onClick={() => navigate(`edit/${ids[0]}`)}>
                  Edit
                  <DropdownMenuShortcut>
                    <SquarePen className={`h-4 w-4`} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate(`change-password/${ids[0]}`)}
                >
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
          deleteRecored(ids as any).then((res) => {
            if (res.data) {
              showAlert("Deleted Successfully", "success");
              setModel(false);
              if (onDelete) onDelete();
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
