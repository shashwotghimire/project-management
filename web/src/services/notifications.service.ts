import api from "@/lib/axios";
import { GetUsersNotificationsResponse, Notification } from "@/types/notification-api.types";

export const getUserNotificationsService = async (orgId: string): Promise<Notification[]> => {
  const response = await api.get<GetUsersNotificationsResponse>(
    `/organizations/${orgId}/notifications`,
  );
  return response.data.data;
};

export const deleteNotificationService = async (orgId: string, notificationId: string): Promise<void> => {
  await api.delete(`/organizations/${orgId}/notifications/${notificationId}`);
};
