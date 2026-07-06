import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getDashboardSummary, generateDashboardSummary } from "../services/llm.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";

export const llmResponse = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const userId = req.user.id;
    const summary = await getDashboardSummary({ userId, orgId });
    return res.status(200).json(new ApiResponse(true, "Summary fetched", summary));
  },
);

export const regenerateLlmResponse = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const userId = req.user.id;
    const summary = await generateDashboardSummary({ userId, orgId });
    return res.status(200).json(new ApiResponse(true, "Summary regenerated", summary));
  },
);
