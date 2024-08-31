import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash2} from "lucide-react";

interface IProps {
  open: boolean;
  callBack: () => void
  onClose: () => void
}

const Index: React.FC<IProps> = (
  {
    open,
    callBack,
    onClose
  }
) => {

  return <Dialog open={open} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently change your data.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className={`flex flex-grow w-full`}>
        <form onSubmit={(event) => {
          event.preventDefault();
          callBack();
        }} className={`w-full`}>
          <Button type="submit" variant={`destructive`} className={`w-full gap-2`}>
            <Trash2 className={`h-4 w-4`} /> Yes, Delete
          </Button>
        </form>
        <Button type="button" variant={`outline`} className={`w-full`} onClick={onClose}>Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

export default Index