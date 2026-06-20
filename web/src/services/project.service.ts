import api from "@/lib/axios";
import {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectByIdResponse,
  GetProjectMembersResponse,
  GetUsersProjectsParams,
  GetUsersProjectsResponse,
} from "@/types/project-api.types";

export const getUsersProjectsService = async (
  orgId: string,
  params?: GetUsersProjectsParams,
): Promise<GetUsersProjectsResponse["data"]> => {
  const response = await api.get<GetUsersProjectsResponse>(
    `/organizations/${orgId}/projects`,
    { params },
  );
  return response.data.data;
};

export const createProjectService = async (
  orgId: string,
  body: CreateProjectRequest,
): Promise<CreateProjectResponse["data"]> => {
  const response = await api.post<CreateProjectResponse>(
    `/organizations/${orgId}/projects`,
    body,
  );
  return response.data.data;
};

export const getProjectByIdService = async (
  orgId: string,
  projectId: string,
): Promise<GetProjectByIdResponse["data"]> => {
  const response = await api.get<GetProjectByIdResponse>(
    `/organizations/${orgId}/projects/${projectId}`,
  );
  return response.data.data;
};

export const getProjectMembersService = async (
  orgId: string,
  projectId: string,
): Promise<GetProjectMembersResponse["data"]> => {
  const response = await api.get<GetProjectMembersResponse>(
    `/organizations/${orgId}/projects/${projectId}/members`,
  );
  return response.data.data;
};
