import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";
import { getUserNotificationsService } from "../services/notifications.service";

export const getUserNotifications = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const userId = req.user.id;
    const notifications = await getUserNotificationsService({ userId, orgId });
    return res
      .status(200)
      .json(new ApiResponse(true, "Notifications fetched successfully", notifications));
  },
);
