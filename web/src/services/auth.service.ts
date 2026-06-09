import api from "@/lib/axios";
import { LoginResponse, RegisterResponse } from "@/types/auth-api.types";

export const loginService = async (
  email: string,
  password: string,
): Promise<LoginResponse["data"]> => {
  const res = (
    await api.post<LoginResponse>("/auth/login", { email, password })
  ).data;
  return res.data;
};

export const registerService = async (
  email: string,
  password: string,
  username: string,
): Promise<RegisterResponse["data"]> => {
  const res = (
    await api.post<RegisterResponse>("/auth/register", {
      email,
      password,
      username,
    })
  ).data;
  return res.data;
};
