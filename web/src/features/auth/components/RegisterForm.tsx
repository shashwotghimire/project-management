"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRegister } from "../hooks/useAuth";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const { mutate, error, isPending } = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password, username, role: "user" },
      {
        onSuccess: (data) => {
          setMessage(data);
          setEmail("");
          setPassword("");
          setUsername("");
        },
      },
    );
  };

  return (
    <div className="max-w-full min-h-screen flex items-center justify-center">
      <Card className="min-w-md p-8 mx-auto border-0 ring-0">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription className="mt-3 mb-3">
            Enter your details below to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="max-w-full" disabled={isPending}>
            {isPending ? "Creating account..." : "Sign up"}
          </Button>
          {error && <p className="text-red-500">{error.message}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <p className="text-sm text-center text-muted-foreground">
            Already registered?{" "}
            <a href="/login" className="font-medium hover:underline">Log in</a>
          </p>
        </form>
      </Card>
    </div>
  );
};
