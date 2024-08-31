import React, {useRef} from "react";
import DrawerForm, {DrawerRef} from "@/components/form/DrawerForm";

import {useFormik} from "formik";
import {Col, Grid} from "@/components/utility";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useCreateUserMutation} from "@/store/user/api";
import {showAlert} from "@/components/ui/sonner";
import Loader from "@/components/utility/BasicLoader";
import {defaultUser} from "@/interfaces/user.ts";

const Index: React.FC = () => {
  const drawerRef = useRef<DrawerRef>(null);

  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const formik = useFormik({
    initialValues: defaultUser,
    onSubmit: async (values) => {
      createUser(values).then((res) => {
        if (res.data) {
          drawerRef.current?.closeDrawer();
        }
        if (res.error) {
          console.log(isLoading, error);
          showAlert("Error", "error");
        }
      });
    },
  });

  return (
    <DrawerForm
      ref={drawerRef}
      title="Create User"
      onSubmit={formik.handleSubmit}
      size={'50%'}
      direction="right"
    >
      {isLoading && <Loader />}
      <form onSubmit={formik.handleSubmit}>
        <Grid className="p-4 pb-0">
          <Col>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Col>
          <Col>
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Col>
          <Col>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Col>
        </Grid>
      </form>
    </DrawerForm>
  );
};

export default Index;
