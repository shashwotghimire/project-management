import api from "@/lib/axios";
import {
  GetUserResponse,
  LoginResponse,
  RegisterResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
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

export const updateUserProfileService = async (
  data: UpdateUserProfileRequest,
): Promise<UpdateUserProfileResponse["data"]> => {
  const res = (
    await api.patch<UpdateUserProfileResponse>("/auth/me", data)
  ).data;
  return res.data;
};

export const uploadUserAvatarService = async (file: File): Promise<{ url: string }> => {
  const form = new FormData();
  form.append("file", file);
  const res = await api.patch<{ success: boolean; data: { url: string } }>("/auth/me/avatar", form);
  return res.data.data;
};
