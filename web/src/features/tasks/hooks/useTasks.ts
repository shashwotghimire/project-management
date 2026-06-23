import { getProjectTasksService } from "@/services/tasks.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProjectTasks = (orgId: string, projectId: string) => {
  return useQuery({
    queryKey: ["tasks", orgId, projectId],
    queryFn: () => getProjectTasksService(orgId, projectId),
  });
};
