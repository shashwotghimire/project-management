import { Request, Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import {
  getUserProfileService,
  loginUserService,
  registerService,
  verifyEmailService,
} from "../services/auth.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { ApiError } from "../helpers/ApiError";
import { AuthRequest } from "../middlewares/auth.middleware";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const result = await registerService({ username, email, password });
    return res
      .status(201)
      .json(new ApiResponse(true, "User registered successfully", result));
  },
);

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.query;
  if (typeof token !== "string") {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Invalid token",
          "Email verification token must be a string",
        ),
      );
  }
  const result = await verifyEmailService(token);
  return res
    .status(200)
    .json(new ApiResponse(true, "Email verified successfully", result));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUserService({ email, password });
  return res
    .status(200)
    .json(new ApiResponse(true, "Login successful", result));
});

export const getUserProfile = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const user = await getUserProfileService(userId);
    return res
      .status(200)
      .json(new ApiResponse(true, "User profile retrieved successfully", user));
  },
);
