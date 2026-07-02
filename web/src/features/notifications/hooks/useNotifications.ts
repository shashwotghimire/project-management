import { useQuery } from "@tanstack/react-query";
import { getUserNotificationsService } from "@/services/notifications.service";

export const useGetUserNotifications = (orgId: string) => {
  return useQuery({
    queryKey: ["notifications", orgId],
    queryFn: () => getUserNotificationsService(orgId),
    enabled: !!orgId,
  });
};
