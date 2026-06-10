export type UserRoles = "user" | "superadmin";
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  githubId: string | null;
  emailVerified: boolean;
  emailVerificationToken: string | null;
  role: "user" | "superadmin";
  gravatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  role: "user" | "superadmin";
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface GetUserResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}
