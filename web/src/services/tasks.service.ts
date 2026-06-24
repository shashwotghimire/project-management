import api from "@/lib/axios";
import {
  GetProjectTasksResponse,
  Task,
  UpdateTaskPositionRequest,
  UpdateTaskPositionResponse,
  UpdateTaskStatusRequest,
  UpdateTaskStatusResponse,
} from "@/types/task-api.types";

export const getProjectTasksService = async (
  orgId: string,
  projectId: string,
): Promise<GetProjectTasksResponse["data"]> => {
  const response = await api.get<GetProjectTasksResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks`,
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
