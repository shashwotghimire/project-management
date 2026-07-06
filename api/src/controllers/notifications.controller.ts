import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";
import {
  deleteNotificationService,
  getUserNotificationsService,
} from "../services/notifications.service";

export const deleteNotification = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const notificationId = isString(req.params.notificationId);
    const userId = req.user.id;
    await deleteNotificationService({ notificationId, userId });
    return res
      .status(200)
      .json(new ApiResponse(true, "Notification deleted successfully", null));
  },
);

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
