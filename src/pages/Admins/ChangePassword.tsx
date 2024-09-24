import React, { useRef, useState } from "react";
import DrawerForm, { DrawerRef } from "@/components/form/DrawerForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Col, Grid } from "@/components/utility";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { showAlert } from "@/components/ui/sonner";
import Loader from "@/components/utility/BasicLoader";
import {
  defaultAdminChangePassword,
  IChangePassword,
} from "@/interfaces/admin.ts";
import InputErrorMessage from "@/components/form/InputErrorMessage.tsx";
import RequiredMark from "@/components/form/RequiredMark.tsx";
import { useParams } from "react-router-dom";
import { useUpdateAdminPasswordMutation } from "@/store/admin/api";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long"),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword") as any, null], "Passwords must match")
    .required("Confirm password is required"),
});

const Index: React.FC = () => {
  const drawerRef = useRef<DrawerRef>(null);
  const [updateAdminPassword, { isLoading }] = useUpdateAdminPasswordMutation();
  const [formData] = useState<IChangePassword>(defaultAdminChangePassword);

  const params = useParams();

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateAdminPassword({
        id: params.id as string,
        updatedBody: values,
      }).then((res: any) => {
        if (res.data) {
          drawerRef.current?.closeDrawer();
          showAlert(res.data || "Updated", "success");
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
    <DrawerForm
      ref={drawerRef}
      title={"Change Password"}
      onSubmit={formik.handleSubmit}
      // size={"9/12"}
      direction="right"
    >
      {isLoading && <Loader />}
      <form onSubmit={formik.handleSubmit}>
        <Grid className="p-4 pb-0">
          <Col>
            <Label htmlFor="newPassword">
              New Password <RequiredMark />
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="newPassword"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            <div className={`min-h-4`}>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <InputErrorMessage message={formik.errors.newPassword} />
              )}
            </div>
          </Col>
          <Col>
            <Label htmlFor="confirmNewPassword">
              Confirm New Password <RequiredMark />
            </Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="confirmNewPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmNewPassword}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            <div className={`min-h-4`}>
              {formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword && (
                  <InputErrorMessage
                    message={formik.errors.confirmNewPassword}
                  />
                )}
            </div>
          </Col>
        </Grid>
      </form>
    </DrawerForm>
  );
};

export default Index;
