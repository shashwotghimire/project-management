import {
  createNotification,
  getUserNotificationsInOrg,
} from "../repositories/notifications.repository";
import { emitNotificationToUser } from "../ws/notification";
import { userMemberOfOrg } from "../repositories/organizations.repository";
import { ApiError } from "../helpers/ApiError";

export const createNotificationService = async (data: {
  userId: string;
  title: string;
  message: string;
  orgId?: string;
  projectId?: string;
  href?: string;
}) => {
  const notification = await createNotification(data);
  emitNotificationToUser(data.userId, notification);
  return notification;
};

export const getUserNotificationsService = async (data: {
  userId: string;
  orgId: string;
}) => {
  const isMember = await userMemberOfOrg(data.userId, data.orgId);
  if (!isMember)
    throw new ApiError(
      403,
      "You are not a member of this organization",
      "Forbidden",
    );
  const notifications = await getUserNotificationsInOrg(data);
  return notifications;
};
