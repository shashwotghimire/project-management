import {
  getUserProfileService,
  loginService,
  registerService,
  updateUserProfileService,
  uploadUserAvatarService,
} from "@/services/auth.service";
import {
  GetUserResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from "@/types/auth-api.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<LoginResponse["data"], Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => {
      return loginService(data.email, data.password);
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      localStorage.setItem("accessToken", data.accessToken);
    },
  });
};

export const useRegister = () => {
  return useMutation<RegisterResponse["data"], Error, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => {
      return registerService(data.email, data.password, data.username);
    },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateUserProfileResponse["data"],
    Error,
    UpdateUserProfileRequest
  >({
    mutationFn: (data) => updateUserProfileService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useGetUserProfile = () => {
  return useQuery<GetUserResponse["data"], Error>({
    queryKey: ["user"],
    queryFn: async () => {
      return await getUserProfileService();
    },
    staleTime: 5 * 60 * 1000, // treat data as fresh for 5 mins — no refetch on remount
    retry: false,
  });
};

export const useUploadUserAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation<{ url: string }, Error, File>({
    mutationFn: (file) => uploadUserAvatarService(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
