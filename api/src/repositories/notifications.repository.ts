import { Notifications } from "../models/notifications.model";

export const createNotification = async (data: {
  userId: string;
  title: string;
  message: string;
  orgId?: string;
  projectId?: string;
}) => {
  return await Notifications.create({
    userId: data.userId,
    title: data.title,
    message: data.message,
    orgId: data.orgId ?? null,
    projectId: data.projectId ?? null,
  });
};
