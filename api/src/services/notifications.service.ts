import { createNotification } from "../repositories/notifications.repository";

export const createNotificationService = async (data: {
  userId: string;
  title: string;
  message: string;
  orgId?: string;
  projectId?: string;
}) => {
  return await createNotification(data);
};
