import jwt from "jsonwebtoken";
import { UserRoles } from "../types/roles";

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
  return jwt.verify(token, process.env.JWT_SECRET!);
}
