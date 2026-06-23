import api from "@/lib/axios";
import { GetProjectTasksResponse, Task } from "@/types/task-api.types";

export const getProjectTasksService = async (
  orgId: string,
  projectId: string,
): Promise<GetProjectTasksResponse["data"]> => {
  const response = await api.get<GetProjectTasksResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks`,
  );
  return response.data.data;
};
