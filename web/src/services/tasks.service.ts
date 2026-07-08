import api from "@/lib/axios";
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetMyOrgTasksResponse,
  GetProjectTasksResponse,
  GetTaskActivityLogsResponse,
  GetTaskByIdResponse,
  PaginatedTasks,
  ReassignTaskRequest,
  ReassignTaskResponse,
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
  dueDate,
}: UpdateTaskRequest): Promise<Task> => {
  const response = await api.patch<UpdateTaskResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}`,
    { title, description, priority, dueDate },
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

export const getMyOrgTasksService = async (orgId: string): Promise<Task[]> => {
  const response = await api.get<GetMyOrgTasksResponse>(
    `/organizations/${orgId}/my-tasks`,
  );
  return response.data.data;
};

export const getTaskActivityLogsService = async (
  orgId: string,
  projectId: string,
  taskId: string,
  page = 1,
  limit = 50,
): Promise<GetTaskActivityLogsResponse["data"]> => {
  const response = await api.get<GetTaskActivityLogsResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}/logs`,
    { params: { page, limit } },
  );
  return response.data.data;
};

export const reassignTaskService = async ({
  orgId,
  projectId,
  taskId,
  newUserId,
}: ReassignTaskRequest): Promise<void> => {
  await api.patch<ReassignTaskResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}/reassign`,
    { newUserId },
  );
};
