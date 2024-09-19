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
          <CardTitle>Basic Details</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="mb-3">
              <Label>
                Name <span className="text-destructive">*</span>
              </Label>
              <Input placeholder="Enter Name" required />
            </div>
            <div className="mb-3">
              <Label>
                Email <span className="text-destructive">*</span>
              </Label>
              <Input type="email" placeholder="Enter Email" required />
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
