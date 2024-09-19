import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

const BasicProfile: React.FC = () => {
  return (
    <>
      <Card x-chunk="profile-auth-chunk-1">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Used to improve security.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="mb-3">
              <Label>
                Current Password <span className="text-destructive">*</span>
              </Label>
              <Input
                type="password"
                placeholder="* * * * * * * * * *"
                required
              />
            </div>
            <div className="mb-3">
              <Label>
                New Password <span className="text-destructive">*</span>
              </Label>
              <Input
                type="password"
                placeholder="* * * * * * * * * *"
                required
              />
            </div>
            <div className="mb-3">
              <Label>
                Confirm New Password <span className="text-destructive">*</span>
              </Label>
              <Input
                type="password"
                placeholder="* * * * * * * * * *"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>
            <Save size={18} />
            Update
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default BasicProfile;
