import { useQuery } from "@tanstack/react-query";
import { getCalendarTasksService } from "@/services/calendar.service";

export const useGetCalendarTasks = (orgId: string) => {
  return useQuery({
    queryKey: ["calendar-tasks", orgId],
    queryFn: () => getCalendarTasksService(orgId),
    enabled: !!orgId,
  });
};
