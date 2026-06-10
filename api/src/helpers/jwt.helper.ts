import jwt from "jsonwebtoken";
import { UserRoles } from "../types/roles";
import { ApiError } from "./ApiError";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  role: UserRoles;
  isEmailVerified: boolean;
}

export function generateAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "Invalid token", "Unauthorized");
    }
    if (err instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Token expired", "Unauthorized");
    }
    throw new ApiError(500, "Internal server error", "Something went wrong");
  }
}
