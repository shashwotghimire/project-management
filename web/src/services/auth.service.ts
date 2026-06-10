import api from "@/lib/axios";
import {
  GetUserResponse,
  LoginResponse,
  RegisterResponse,
} from "@/types/auth-api.types";

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

export const getUserProfileService = async (): Promise<
  GetUserResponse["data"]
> => {
  const res = (await api.get<GetUserResponse>("/auth/me")).data;
  return res.data;
};
