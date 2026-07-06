import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotificationService,
  getUserNotificationsService,
} from "@/services/notifications.service";

export const useGetUserNotifications = (orgId: string) => {
  return useQuery({
    queryKey: ["notifications", orgId],
    queryFn: () => getUserNotificationsService(orgId),
    enabled: !!orgId,
  });
};

export const useDeleteNotification = (orgId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      deleteNotificationService(orgId, notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", orgId] });
    },
  });
};
