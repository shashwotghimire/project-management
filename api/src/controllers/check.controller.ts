import { Request, Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { ApiResponse } from "../helpers/ApiResponse";

export const healthCheck = asyncHandler(async (req: Request, res: Response) => {
  return res
    .status(200)
    .json(new ApiResponse(true, "Api is up", " Api running"));
});
