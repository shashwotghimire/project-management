import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { generateDashboardSummary } from "../services/llm.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";

export const llmResponse = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const userId = req.user.id;
    const summary = await generateDashboardSummary({ userId, orgId });
    return res.status(200).json(new ApiResponse(true, "Summary generated", summary));
  },
);
