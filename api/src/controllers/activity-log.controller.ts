import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";
import { getOrgActivityLogsService, getTaskActivityLogsService } from "../services/activity-log.service";

export const getOrgActivityLogs = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const userId = req.user.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const result = await getOrgActivityLogsService({ orgId, userId, page, limit });

    return res
      .status(200)
      .json(new ApiResponse(true, "Activity logs fetched successfully", result));
  },
);

export const getTaskActivityLogs = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const result = await getTaskActivityLogsService({ taskId, projectId, userId, page, limit });

    return res
      .status(200)
      .json(new ApiResponse(true, "Task activity logs fetched successfully", result));
  },
);
