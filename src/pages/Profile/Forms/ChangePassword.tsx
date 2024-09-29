import * as Yup from "yup";
import InputErrorMessage from "@/components/form/InputErrorMessage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showAlert } from "@/components/ui/sonner";
import {
  defaultAdmin,
  defaultProfileChangePassword,
  IProfileChangePassword,
} from "@/interfaces/admin";
import { useUpdateProfilePasswordMutation } from "@/store/admin/api";
import { useFormik } from "formik";
import { Save } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/admin/slice";
import {ReloadIcon} from "@radix-ui/react-icons";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required")
    .min(8, "Password must be at least 8 characters long"),

  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long"),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword") as any, null], "Passwords must match")
    .required("Confirm password is required"),
});
const ChangePassword: React.FC = () => {
  const [updateProfilePassword, {isLoading}] = useUpdateProfilePasswordMutation();
  const dispatch = useDispatch();
  const [formData] = useState<IProfileChangePassword>(
    defaultProfileChangePassword
  );
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateProfilePassword({
        updatedBody: values,
      }).then((res: any) => {
        if (res.data) {
          showAlert(res.data || "Updated", "success");
          dispatch(setAuth(defaultAdmin));
          navigate("/");
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
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Used to improve security.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <Label>
                Current Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                onBlur={formik.handleBlur}
                autoComplete="off"
                placeholder="* * * * * * * * * *"
              />
              <div className={`min-h-4`}>
                {formik.touched.currentPassword &&
                  formik.errors.currentPassword && (
                    <InputErrorMessage
                      message={formik.errors.currentPassword}
                    />
                  )}
              </div>
            </div>
            <div className="mb-3">
              <Label>
                New Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                autoComplete="off"
                placeholder="* * * * * * * * * *"
              />
              <div className={`min-h-4`}>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <InputErrorMessage message={formik.errors.newPassword} />
                )}
              </div>
            </div>
            <div className="mb-3">
              <Label>
                Confirm New Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmNewPassword}
                onBlur={formik.handleBlur}
                autoComplete="off"
                placeholder="* * * * * * * * * *"
              />
              <div className={`min-h-4`}>
                {formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword && (
                    <InputErrorMessage
                      message={formik.errors.confirmNewPassword}
                    />
                  )}
              </div>
            </div>
            <Button type={`submit`}>
              {isLoading ? <>
                <ReloadIcon className={`h-4 w-4 animate-spin`}  />
                Updating
              </> : <>
                <Save className={`h-4 w-4`} />
                Update
              </>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
