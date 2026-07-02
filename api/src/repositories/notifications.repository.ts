import { Notifications } from "../models/notifications.model";

export const createNotification = async (data: {
  userId: string;
  title: string;
  message: string;
  orgId?: string;
  projectId?: string;
  href?: string;
}) => {
  return await Notifications.create({
    userId: data.userId,
    title: data.title,
    message: data.message,
    orgId: data.orgId ?? null,
    projectId: data.projectId ?? null,
    href: data.href ?? null,
  });
};

export const getUserNotificationsInOrg = async (data: {
  userId: string;
  orgId: string;
}) => {
  return await Notifications.findAll({
    where: {
      userId: data.userId,
      orgId: data.orgId,
    },
    order: [["createdAt", "DESC"]],
    limit: 15,
  });
};
