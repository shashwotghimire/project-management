import api from "@/lib/axios";
import {
  CreateProjectRequest,
  CreateProjectResponse,
  GetDashboardProjectsResponse,
  GetProjectByIdResponse,
  GetProjectMembersResponse,
  GetProjectTaskStatsResponse,
  GetUsersProjectsParams,
  GetUsersProjectsResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
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

export const getDashboardProjectsService = async (
  orgId: string,
): Promise<GetDashboardProjectsResponse["data"]> => {
  const response = await api.get<GetDashboardProjectsResponse>(
    `/organizations/${orgId}/projects/dashboard`,
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

export const addMemberToProjectService = async (
  orgId: string,
  projectId: string,
  userId: string,
): Promise<void> => {
  await api.post(`/organizations/${orgId}/projects/${projectId}/members`, { userId });
};

export const removeProjectMemberService = async (
  orgId: string,
  projectId: string,
  userId: string,
): Promise<void> => {
  await api.delete(`/organizations/${orgId}/projects/${projectId}/members/${userId}`);
};

export const updateProjectService = async (
  orgId: string,
  projectId: string,
  body: UpdateProjectRequest,
): Promise<UpdateProjectResponse["data"]> => {
  const response = await api.patch<UpdateProjectResponse>(
    `/organizations/${orgId}/projects/${projectId}`,
    body,
  );
  return response.data.data;
};

export const getProjectTaskStatsService = async (
  orgId: string,
  projectId: string,
): Promise<GetProjectTaskStatsResponse["data"]> => {
  const response = await api.get<GetProjectTaskStatsResponse>(
    `/organizations/${orgId}/projects/${projectId}/task-stats`,
  );
  return response.data.data;
};

export const uploadProjectLogoService = async (
  orgId: string,
  projectId: string,
  file: File,
): Promise<{ url: string }> => {
  const form = new FormData();
  form.append("file", file);
  const response = await api.patch<{ success: boolean; data: { url: string } }>(
    `/organizations/${orgId}/projects/${projectId}/logo`,
    form,
  );
  return response.data.data;
};
