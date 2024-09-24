import React, { useEffect, useRef, useState } from "react";
import DrawerForm, { DrawerRef } from "@/components/form/DrawerForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Col, Grid } from "@/components/utility";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  useCreateRoleMutation,
  useLazyGetRoleByIdQuery,
  useUpdateRoleMutation,
} from "@/store/role/api";
import { showAlert } from "@/components/ui/sonner";
import Loader from "@/components/utility/BasicLoader";
import { defaultRole, IRole } from "@/interfaces/role.ts";
import InputErrorMessage from "@/components/form/InputErrorMessage.tsx";
import RequiredMark from "@/components/form/RequiredMark.tsx";
import { useParams } from "react-router-dom";
import { EUserType } from "@/interfaces";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name must be 50 characters or less"),
  // Add additional validation rules for other fields if necessary
});

const Index: React.FC = () => {
  const drawerRef = useRef<DrawerRef>(null);
  const [updateRole, { isLoading: isUpdateLoding }] = useUpdateRoleMutation();
  const [getRoleById, { data }] = useLazyGetRoleByIdQuery();
  const [createRole, { isLoading }] = useCreateRoleMutation();
  const [formData, setFormData] = useState<IRole>(defaultRole);
  const [formState, setFormState] = useState(0);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setFormState(1);
      getRoleById(params.id);
    } else {
      setFormState(0);
    }
  }, [getRoleById, params.id]);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      (formState
        ? updateRole({ id: params.id as string, updatedBody: values })
        : createRole(values)
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
      title={formState ? "Edit Role" : "Create Role"}
      onSubmit={formik.handleSubmit}
      size="sm"
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
            {formik.touched.name && formik.errors.name && (
              <div className={`min-h-4`}>
                <InputErrorMessage message={formik.errors.name} />
              </div>
            )}
          </Col>
          <Col className="flex justify-between items-center">
            <Label htmlFor="type">
              Type <RequiredMark />
            </Label>
            <Tabs
              value={formik.values.type}
              defaultValue={EUserType.ADMIN}
              onValueChange={(value) => formik.setFieldValue("type", value)}
            >
              <TabsList>
                <TabsTrigger value={EUserType.ADMIN} className={`capitalize`}>
                  {EUserType.ADMIN}
                </TabsTrigger>
                <TabsTrigger value={EUserType.USER} className={`capitalize`}>
                  {EUserType.USER}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Col>
          {formik.touched.type && formik.errors.type && (
            <div className={`min-h-4`}>
              <InputErrorMessage message={formik.errors.type} />
            </div>
          )}
          <Col>
            <div className="flex items-center rounded-md">
              <div className="flex-1 space-y-1">
                <Label className={`mb-0`} htmlFor="status">
                  Status <RequiredMark />
                </Label>
              </div>
              <Switch
                id="status"
                name="status"
                checked={formik.values.status === 1}
                onCheckedChange={(value) => {
                  formik.setFieldValue("status", value ? 1 : 0);
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
