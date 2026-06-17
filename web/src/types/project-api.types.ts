export type ProjectStatus = "active" | "inactive" | "archived";

export interface Project {
  id: string;
  name: string;
  organizationId: string;
  createdBy: string;
  logoUrl: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  id: string;
  userId: string;
  projectId: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
  Project: Project;
}

export interface CreateProjectRequest {
  name: string;
  logoUrl?: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  data: Project;
}

export interface PaginatedProjectsData {
  data: ProjectMember[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUsersProjectsResponse {
  success: boolean;
  message: string;
  data: PaginatedProjectsData;
}

export interface GetUsersProjectsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ProjectMemberWithUser {
  id: string;
  userId: string;
  projectId: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
  member: {
    id: string;
    username: string;
    email: string;
    gravatarUrl: string;
  };
}

export interface GetProjectMembersResponse {
  success: boolean;
  message: string;
  data: ProjectMemberWithUser[];
}
