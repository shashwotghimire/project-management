"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLogin, useRegister } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { mutate, error, isPending } = useRegister();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleLogin = (e: React.FormEvent) => {
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
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign up</Button>
        {message && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  );
};
