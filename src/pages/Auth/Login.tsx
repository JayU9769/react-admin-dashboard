import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/admins/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      navigate("/admin");
    } catch (e: any) {
      console.log(e);
      setError("Invalid credentials, please try again");
    }
  };
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
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
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
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" onClick={login}>
          Login
        </Button>
      </div>
      {error && <p>{error}</p>}
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
