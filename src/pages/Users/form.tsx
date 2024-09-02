import React, { useEffect, useRef, useState } from "react";
import DrawerForm, { DrawerRef } from "@/components/form/DrawerForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Col, Grid } from "@/components/utility";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCreateUserMutation } from "@/store/user/api";
import { showAlert } from "@/components/ui/sonner";
import Loader from "@/components/utility/BasicLoader";
import { defaultUser } from "@/interfaces/user.ts";
import InputErrorMessage from "@/components/form/InputErrorMessage.tsx";
import RequiredMark from "@/components/form/RequiredMark.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("First Name is required")
    .max(50, "Name must be 50 characters or less"),
  password: Yup.string()
    .required("Last Name is required")
    .max(50, "Last must be 50 characters or less"),
  email: Yup.string()
    .required("Email is required")
    .max(50, "Email must be 50 characters or less"),
  // Add additional validation rules for other fields if necessary
});

const Index: React.FC = () => {
  const drawerRef = useRef<DrawerRef>(null);

  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const [formState, setFormState] = useState(0);

  const params = useParams();
  console.log(formState);
  useEffect(() => {
    if (params.id) {
      setFormState(1);
      console.log(params.id);
    } else {
      setFormState(0);
    }
  }, [params.id]);

  const formik = useFormik({
    initialValues: defaultUser,
    validationSchema,
    onSubmit: async (values) => {
      createUser(values).then((res) => {
        if (res.data) {
          drawerRef.current?.closeDrawer();
        }
        if (res.error) {
          console.log((res.error as any).data.message, error);
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
      title={formState ? "Edit User" : "Create User"}
      onSubmit={formik.handleSubmit}
      // size={"9/12"}
      direction="right"
    >
      {isLoading && <Loader />}
      <form onSubmit={formik.handleSubmit}>
        <Grid className="p-4 pb-0">
          <Col>
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
          </Col>
          <Col>
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
          </Col>
          <Col>
            <Label htmlFor="password">
              Password <RequiredMark />
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            <div className={`min-h-4`}>
              {formik.touched.password && formik.errors.password && (
                <InputErrorMessage message={formik.errors.password} />
              )}
            </div>
          </Col>
          <Col>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="status">
                  Status <RequiredMark />
                </Label>
                <p className="text-xs leading-normal text-muted-foreground">
                  Use this option to set the user as Active or Inactive across
                  the platform.
                </p>
              </div>
              <Switch
                id="status"
                name="status"
                checked={formik.values.status === "active"}
                onCheckedChange={(value) => {
                  console.log(value);
                  formik.setFieldValue("status", value ? "active" : "inactive");
                }}
              />
            </div>
          </Col>
        </Grid>
      </form>
    </DrawerForm>
  );
};

export default Index;
