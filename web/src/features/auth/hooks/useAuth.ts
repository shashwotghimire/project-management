import { loginService, registerService } from "@/services/auth.service";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth-api.types";
import { useMutation } from "@tanstack/react-query";

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
