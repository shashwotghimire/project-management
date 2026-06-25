import api from "@/lib/axios";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetProjectTasksResponse,
  GetTaskByIdResponse,
  PaginatedTasks,
  Task,
  TaskByIdData,
  UpdateTaskPositionRequest,
  UpdateTaskPositionResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateTaskStatusRequest,
  UpdateTaskStatusResponse,
} from "@/types/task-api.types";

export const getProjectTasksService = async (
  orgId: string,
  projectId: string,
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedTasks> => {
  const response = await api.get<GetProjectTasksResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks`,
    { params: { page, limit } },
  );
  return response.data.data;
};

export const getTaskByIdService = async (
  orgId: string,
  projectId: string,
  taskId: string,
): Promise<TaskByIdData> => {
  const response = await api.get<GetTaskByIdResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}`,
  );
  return response.data.data;
};

export const updateTaskStatusService = async ({
  orgId,
  projectId,
  taskId,
  status,
  position,
}: UpdateTaskStatusRequest): Promise<UpdateTaskStatusResponse> => {
  const response = await api.patch<UpdateTaskStatusResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}/status`,
    { status, position },
  );
  return response.data;
};

export const updateTaskPositionService = async ({
  orgId,
  projectId,
  taskId,
  position,
}: UpdateTaskPositionRequest): Promise<UpdateTaskPositionResponse> => {
  const response = await api.patch<UpdateTaskPositionResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}/position`,
    { position },
  );
  return response.data;
};

export const updateTaskService = async ({
  orgId,
  projectId,
  taskId,
  title,
  description,
  priority,
}: UpdateTaskRequest): Promise<Task> => {
  const response = await api.patch<UpdateTaskResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}`,
    { title, description, priority },
  );
  return response.data.data;
};

export const deleteTaskService = async ({
  orgId,
  projectId,
  taskId,
}: DeleteTaskRequest): Promise<void> => {
  await api.delete<DeleteTaskResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}`,
  );
};

export const createTaskService = async ({
  orgId,
  projectId,
  title,
  description,
  status,
  priority,
  assignedTo,
}: CreateTaskRequest): Promise<Task> => {
  const response = await api.post<CreateTaskResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks`,
    { title, description, status, priority, assignedTo },
  );
  return response.data.data;
};
