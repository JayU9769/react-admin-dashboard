import React, { useEffect, useRef, useState } from "react";
import DrawerForm, { DrawerRef } from "@/components/form/DrawerForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Col, Grid } from "@/components/utility";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { showAlert } from "@/components/ui/sonner";
import Loader from "@/components/utility/BasicLoader";
import { defaultAdminForm } from "@/interfaces/admin.ts";
import InputErrorMessage from "@/components/form/InputErrorMessage.tsx";
import RequiredMark from "@/components/form/RequiredMark.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { useParams } from "react-router-dom";
import { useCreateAdminMutation, useUpdateAdminMutation, useGetAdminByIdQuery } from "@/store/admin/api";
import { IAdminForm } from "@/interfaces/admin";
import { SelectType } from "./Select";

const getValidationSchema = (isEditMode: boolean) => {
  return Yup.object().shape({
    name: Yup.string().required("First Name is required").min(3, "Name must be 3 characters or more").max(50, "Name must be 50 characters or less"),
    email: Yup.string().required("Email is required").email("Invalid Email").max(50, "Email must be 50 characters or less"),
    ...(isEditMode
      ? {} // No password validation in edit mode
      : {
          password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(50, "Password must be 50 characters or less"),
        }),
    // Add additional validation rules for other fields if necessary
  });
};

const Index: React.FC = () => {
  const params = useParams();
  const drawerRef = useRef<DrawerRef>(null);
  const [updateAdmin, { isLoading: isUpdateLoading }] = useUpdateAdminMutation();
  const { data } = useGetAdminByIdQuery(params.id as string, {
    skip: !params.id, // Skip the query if params.id is undefined
  });
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const [formData, setFormData] = useState<IAdminForm>(defaultAdminForm);
  const [formState, setFormState] = useState(0);

  useEffect(() => {
    if (params.id) {
      setFormState(1);
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
      (formState ? updateAdmin({ id: params.id as string, updatedBody: values }) : createAdmin(values)).then((res) => {
        if (res.data) {
          drawerRef.current?.closeDrawer();
        }
        if (res.error) {
          showAlert((res.error as any).data.message || "Internal server error", "error");
        }
      });
    },
  });
  console.log(formik.values);
  return (
    <DrawerForm
      ref={drawerRef}
      title={formState ? "Edit User" : "Create User"}
      onSubmit={formik.handleSubmit}
      // size={"9/12"}
      direction="right"
    >
      {(isLoading || isUpdateLoading) && <Loader />}
      <form onSubmit={formik.handleSubmit}>
        <Grid className="p-4 pb-0">
          <Col>
            <Label htmlFor="name">
              Name <RequiredMark />
            </Label>
            <Input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
            <div className={`min-h-4`}>{formik.touched.name && formik.errors.name && <InputErrorMessage message={formik.errors.name} />}</div>
          </Col>
          <Col>
            <Label htmlFor="email">
              E-Mail <RequiredMark />
            </Label>
            <Input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
            <div className={`min-h-4`}>{formik.touched.email && formik.errors.email && <InputErrorMessage message={formik.errors.email} />}</div>
          </Col>
          {!formState && (
            <Col>
              <Label htmlFor="password">
                Password <RequiredMark />
              </Label>
              <Input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} autoComplete="off" />
              <div className={`min-h-4`}>{formik.touched.password && formik.errors.password && <InputErrorMessage message={formik.errors.password} />}</div>
            </Col>
          )}
          <Col>
            <Label htmlFor="email">
              Role <RequiredMark />
            </Label>
            <SelectType selectedValue={formik.values.roles} selectedLabel={null} onChange={(val: string) => formik.setFieldValue("roles", val)} />
            <div className={`min-h-4`}>{formik.touched.email && formik.errors.email && <InputErrorMessage message={formik.errors.email} />}</div>
          </Col>
          <Col>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <Label className={`mb-0`} htmlFor="status">
                  Status <RequiredMark />
                </Label>
                <p className="text-xs leading-normal text-muted-foreground">Use this option to set the user as Active or Inactive across the platform.</p>
              </div>
              <Switch
                id="status"
                name="status"
                checked={formik.values.status ? true : false}
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
