import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/ApiError";
import { verifyAccessToken } from "../helpers/jwt.helper";
import { JwtPayload } from "jsonwebtoken";
import { findUserById } from "../repositories/users.repository";

interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  isEmailVerified: boolean;
}

export interface AuthRequest extends Request {
  user: TokenPayload;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized", "Invalid or missing token");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Unauthorized", "Invalid or missing token");
    }
    const decoded = verifyAccessToken(token) as TokenPayload;
    const user = await findUserById(decoded.id);
    if (!user) {
      throw new ApiError(401, "Unauthorized", "User not found");
    }
    if (!user.emailVerified) {
      throw new ApiError(401, "Unauthorized", "Email not verified");
    }
    (req as AuthRequest).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
