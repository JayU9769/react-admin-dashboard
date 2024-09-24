import * as Yup from "yup";
import InputErrorMessage from "@/components/form/InputErrorMessage";
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
import { showAlert } from "@/components/ui/sonner";
import { IAdmin } from "@/interfaces/admin";
import { useUpdateProfileMutation } from "@/store/admin/api";
import { adminStates } from "@/store/admin/slice";
import { useFormik } from "formik";
import { Save } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import RequiredMark from "@/components/form/RequiredMark";

const getValidationSchema = () => {
  Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(50, "Name must be 50 characters or less"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email")
      .max(50, "Email must be 50 characters or less"),
  });
};

const BasicProfile: React.FC = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const { auth } = useSelector(adminStates);
  const [formData] = useState<IAdmin>(auth);
  const formik = useFormik({
    initialValues: formData,
    validationSchema: getValidationSchema(),
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateProfile({
        updatedBody: { name: values.name, email: values.email },
      }).then((res: any) => {
        if (res.data) {
          showAlert("Profile Updated", "success");
        }
        if (res.error) {
          showAlert(
            (res.error as any).data.message || "Internal server error",
            "error"
          );
        }
      });
    },
  });
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
              <Label htmlFor="name">
                Name <RequiredMark />
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              <div className={`min-h-4`}>
                {formik.touched.name && formik.errors.name && (
                  <InputErrorMessage message={formik.errors.name} />
                )}
              </div>
            </div>
            <div className="mb-3">
              <Label htmlFor="email">
                E-Mail <RequiredMark />
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              <div className={`min-h-4`}>
                {formik.touched.email && formik.errors.email && (
                  <InputErrorMessage message={formik.errors.email} />
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={() => formik.handleSubmit()}>
            <Save size={18} />
            Update
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default BasicProfile;
