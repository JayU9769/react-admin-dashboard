import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation } from "@/store/admin/api";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import InputErrorMessage from "@/components/form/InputErrorMessage.tsx";
import RequiredMark from "@/components/form/RequiredMark.tsx";
import { Loader2 } from "lucide-react";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Last Name is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Last must be 50 characters or less"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid Email")
    .max(50, "Email must be 50 characters or less"),
  // Add additional validation rules for other fields if necessary
});

const Login: React.FC = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const [formData] = useState({
    email: "",
    password: "",
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: login,
  });

  return (
    <>
      <div className="grid gap-2 text-center mb-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} method="post">
        <div className={`min-h-2 mb-4`}>
          {isError && (error as any).message && (
            <InputErrorMessage message={(error as any).message} />
          )}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email <RequiredMark />
            </Label>
            <Input
              id="email"
              type="email"
              value={formik.values.email}
              placeholder="Enter your email"
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <InputErrorMessage message={formik.errors.email} />
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">
                Password <RequiredMark />
              </Label>
              <a
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <InputErrorMessage message={formik.errors.password} />
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default Login;
