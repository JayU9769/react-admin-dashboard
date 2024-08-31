import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Link} from "react-router-dom";


const Login: React.FC = () => {
  return (
    <>
      <div className="grid gap-2 text-center mb-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" placeholder="Enter your password" required/>
        </div>
        <Button type="submit" className="w-full">
          <Link to="/admin">
            Login
          </Link>

        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/admin/signup" className="underline">
          Sign up
        </Link>
      </div>
    </>
  )

}

export default Login