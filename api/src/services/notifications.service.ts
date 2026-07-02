import { createNotification } from "../repositories/notifications.repository";
import { emitNotificationToUser } from "../ws/notification";

export const createNotificationService = async (data: {
  userId: string;
  title: string;
  message: string;
  orgId?: string;
  projectId?: string;
}) => {
  const notification = await createNotification(data);
  emitNotificationToUser(data.userId, notification);
  return notification;
};
