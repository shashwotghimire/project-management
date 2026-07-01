import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { message } from "../services/llm.service";
import { ApiResponse } from "../helpers/ApiResponse";

export const llmResponse = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const response = await message();
    return res.status(200).json(new ApiResponse(true, "", ""));
  },
);
