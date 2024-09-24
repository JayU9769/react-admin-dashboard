import React, { useEffect, useRef, useState } from "react";
import DrawerForm, { DrawerRef } from "@/components/form/DrawerForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Col, Grid } from "@/components/utility";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useCreateUserMutation,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/store/user/api";
import { showAlert } from "@/components/ui/sonner";
import Loader from "@/components/utility/BasicLoader";
import { defaultUser, IUser } from "@/interfaces/user.ts";
import InputErrorMessage from "@/components/form/InputErrorMessage.tsx";
import RequiredMark from "@/components/form/RequiredMark.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { useParams } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const getValidationSchema = (isEditMode: boolean) => {
  Yup.object().shape({
    name: Yup.string()
      .required("First Name is required")
      .max(50, "Name must be 50 characters or less"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email")
      .max(50, "Email must be 50 characters or less"),
    ...(isEditMode
      ? {} // No password validation in edit mode
      : {
          password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .max(50, "Password must be 50 characters or less"),
        }),
    // Add additional validation rules for other fields if necessary
  });
};

const Index: React.FC = () => {
  const drawerRef = useRef<DrawerRef>(null);
  const [updateUser, { isLoading: isUpdateLoding }] = useUpdateUserMutation();
  const [getUserById, { data }] = useLazyGetUserByIdQuery();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [formData, setFormData] = useState<IUser>(defaultUser);
  const [formState, setFormState] = useState(0);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setFormState(1);
      getUserById(params.id);
    } else {
      setFormState(0);
    }
  }, [params.id]);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: formData,
    validationSchema: getValidationSchema(formState === 1),
    enableReinitialize: true,
    onSubmit: async (values) => {
      (formState
        ? updateUser({ id: params.id as string, updatedUser: values })
        : createUser(values)
      ).then((res) => {
        if (res.data) {
          drawerRef.current?.closeDrawer();
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
      title={formState ? "Edit User" : "Create User"}
      onSubmit={formik.handleSubmit}
      // size={"9/12"}
      direction="right"
    >
      {(isLoading || isUpdateLoding) && <Loader />}
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
          {!formState && (
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
          )}
          <Col>
            <Label htmlFor="phoneNo">
              Phone <RequiredMark />
            </Label>
            <PhoneInput
              defaultCountry="in"
              className="w-full"
              value={formik.values.phoneNo}
              onChange={(phone) => formik.setFieldValue("phoneNo", phone)}
              onBlur={formik.handleBlur}
            />
            <div className={`min-h-4`}>
              {formik.touched.phoneNo && formik.errors.phoneNo && (
                <InputErrorMessage message={formik.errors.phoneNo} />
              )}
            </div>
          </Col>
          <Col>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <Label className={`mb-0`} htmlFor="status">
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
