import axios from "axios";
import { ApiError } from "@/types/api-error.types";
import type {
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
    }
    const apiError: ApiError = {
      message: error.response?.data.error || "Something went wrong",
      status: error.response?.status || 500,
      error: error.response?.data.message || "Something went wrong",
    };
    return Promise.reject(apiError);
  },
);

export default api;
