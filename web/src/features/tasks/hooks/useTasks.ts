import {
  createTaskService,
  deleteTaskService,
  getProjectTasksService,
  getTaskByIdService,
  updateTaskPositionService,
  updateTaskService,
  updateTaskStatusService,
} from "@/services/tasks.service";
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  PaginatedTasks,
  Task,
  UpdateTaskPositionRequest,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
} from "@/types/task-api.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProjectTasks = (
  orgId: string,
  projectId: string,
  page: number = 1,
  limit: number = 20,
) => {
  return useQuery({
    queryKey: ["tasks", orgId, projectId, page, limit],
    queryFn: () => getProjectTasksService(orgId, projectId, page, limit),
  });
};

export const useGetTaskById = (
  orgId: string,
  projectId: string,
  taskId: string,
) => {
  return useQuery({
    queryKey: ["task", orgId, projectId, taskId],
    queryFn: () => getTaskByIdService(orgId, projectId, taskId),
  });
};

export const useUpdateTaskStatus = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateTaskStatusRequest, { previous: PaginatedTasks | undefined }>({
    mutationFn: async (data) => {
      await updateTaskStatusService(data);
    },
    onMutate: async (data) => {
      const queryKey = ["tasks", orgId, projectId];
      await queryClient.cancelQueries({ queryKey, exact: false });
      const previous = queryClient.getQueryData<PaginatedTasks>(
        queryClient.getQueryCache().findAll({ queryKey, exact: false })[0]?.queryKey ?? queryKey,
      );

      queryClient.setQueriesData<PaginatedTasks>({ queryKey }, (old) => {
        if (!old) return old;
        return {
          ...old,
          tasks: old.tasks.map((t) =>
            t.id === data.taskId
              ? { ...t, status: data.status, position: data.position }
              : t,
          ),
        };
      });

      return { previous };
    },
    onError: (_err, _data, context) => {
      if (context?.previous) {
        const queryKey = ["tasks", orgId, projectId];
        queryClient.setQueriesData({ queryKey }, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", orgId, projectId], exact: false });
    },
  });
};

export const useUpdateTaskPosition = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateTaskPositionRequest, { previous: PaginatedTasks | undefined }>({
    mutationFn: async (data) => {
      await updateTaskPositionService(data);
    },
    onMutate: async (data) => {
      const queryKey = ["tasks", orgId, projectId];
      await queryClient.cancelQueries({ queryKey, exact: false });
      const previous = queryClient.getQueryData<PaginatedTasks>(
        queryClient.getQueryCache().findAll({ queryKey, exact: false })[0]?.queryKey ?? queryKey,
      );

      queryClient.setQueriesData<PaginatedTasks>({ queryKey }, (old) => {
        if (!old) return old;
        return {
          ...old,
          tasks: old.tasks.map((t) =>
            t.id === data.taskId ? { ...t, position: data.position } : t,
          ),
        };
      });

      return { previous };
    },
    onError: (_err, _data, context) => {
      if (context?.previous) {
        const queryKey = ["tasks", orgId, projectId];
        queryClient.setQueriesData({ queryKey }, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", orgId, projectId], exact: false });
    },
  });
};

export const useCreateTask = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, CreateTaskRequest>({
    mutationFn: createTaskService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", orgId, projectId], exact: false });
    },
  });
};

export const useUpdateTask = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, UpdateTaskRequest>({
    mutationFn: updateTaskService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", orgId, projectId], exact: false });
    },
  });
};

export const useDeleteTask = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeleteTaskRequest>({
    mutationFn: deleteTaskService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", orgId, projectId], exact: false });
    },
  });
};
