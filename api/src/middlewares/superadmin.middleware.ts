import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import { ApiError } from "../helpers/ApiError";

export const superAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authReq = req as AuthRequest;
    if (!authReq.user || authReq.user.role !== "superadmin") {
      throw new ApiError(403, "Forbidden", "Super admin access required");
    }
    next();
  } catch (error) {
    next(error);
  }
};
