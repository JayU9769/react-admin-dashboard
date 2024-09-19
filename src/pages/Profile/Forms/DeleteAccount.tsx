import { Button } from "@/components/ui/button";
import {
  Card,
  //   CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash } from "lucide-react";

const DeleteAccount: React.FC = () => {
  return (
    <>
      <Card x-chunk="profile-auth-chunk-3">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Used to delete your existance from control panel.
          </CardDescription>
        </CardHeader>
        {/* <CardContent></CardContent> */}
        <CardFooter className="border-t px-6 py-4">
          <Button variant={"destructive"}>
            <Trash size={18} /> Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default DeleteAccount;
