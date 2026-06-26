"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, error, isPending } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (redirect) return router.push(redirect);
          data.user.role === "superadmin"
            ? router.push("/admin")
            : router.push("/onboarding");
        },
      },
    );
  };
  return (
    <div className="max-w-full min-h-screen  flex items-center justify-center">
      <Card className="min-w-md p-8 mx-auto border-0 ring-0">
        <CardHeader className="">
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription className="mt-3 mb-3">
            Enter your email and password to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
            {isPending ? "Logging you in" : "Log in"}
          </Button>
          {error && <p className="text-red-500">{error.message}</p>}
        </form>
      </Card>
    </div>
  );
};
