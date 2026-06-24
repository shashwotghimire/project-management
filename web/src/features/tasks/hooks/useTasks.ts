import {
  getProjectTasksService,
  updateTaskPositionService,
  updateTaskStatusService,
} from "@/services/tasks.service";
import {
  UpdateTaskPositionRequest,
  UpdateTaskStatusRequest,
} from "@/types/task-api.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProjectTasks = (orgId: string, projectId: string) => {
  return useQuery({
    queryKey: ["tasks", orgId, projectId],
    queryFn: () => getProjectTasksService(orgId, projectId),
  });
};

export const useUpdateTaskStatus = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, UpdateTaskStatusRequest>({
    mutationFn: async (data) => { await updateTaskStatusService(data); },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", orgId, projectId] });
    },
  });
};

export const useUpdateTaskPosition = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, UpdateTaskPositionRequest>({
    mutationFn: async (data) => { await updateTaskPositionService(data); },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", orgId, projectId] });
    },
  });
};
