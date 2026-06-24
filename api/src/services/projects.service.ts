import { ApiError } from "../helpers/ApiError";
import { getOrgByAdminId, userMemberOfOrg } from "../repositories/organizations.repository";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjectsByUserId,
  isUserAdminOfProject,
  isUserMemberOfProject,
  updateProject,
} from "../repositories/projects.repository";

export const createProjectService = async ({
  name,
  organizationId,
  createdBy,
  logoUrl,
}: {
  name: string;
  organizationId: string;
  createdBy: string;
  logoUrl?: string;
}) => {
  const org = await getOrgByAdminId(createdBy, organizationId);
  if (!org) {
    throw new ApiError(
      403,
      "Only organization admins can create projects",
      "Only organization admins can create projects",
    );
  }

  return await createProject({
    name,
    organizationId,
    createdBy,
    ...(logoUrl && { logoUrl }),
  });
};

export const updateProjectService = async ({
  projectId,
  userId,
  name,
  logoUrl,
  status,
}: {
  projectId: string;
  userId: string;
  name?: string;
  logoUrl?: string;
  status?: "active" | "archived";
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found", "Project not found");
  }

  const isAdmin = await isUserAdminOfProject(userId, projectId);
  if (!isAdmin) {
    throw new ApiError(
      403,
      "Only project admins can update projects",
      "Only project admins can update projects",
    );
  }

  return await updateProject(projectId, {
    ...(name && { name }),
    ...(logoUrl && { logoUrl }),
    ...(status && { status }),
  });
};

export const getUserProjectsService = async ({
  userId,
  organizationId,
  page,
  limit,
  search = "",
}: {
  userId: string;
  organizationId: string;
  page: number;
  limit: number;
  search?: string;
}) => {
  return await getProjectsByUserId(userId, organizationId, {
    page,
    limit,
    search,
  });
};

export const deleteProjectService = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found", "Project not found");
  }

  const isAdmin = await isUserAdminOfProject(userId, projectId);
  if (!isAdmin) {
    throw new ApiError(
      403,
      "Only project admins can delete projects",
      "Only project admins can delete projects",
    );
  }

  await deleteProject(projectId);
};

export const getProjectMembersService = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found", "Project not found");
  }

  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "Access denied", "Access denied");
  }

  return await getProjectMembers(projectId);
};

export const getProjectByIdService = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found", "Project not found");
  }

  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "Access denied", "Access denied");
  }

  return project;
};

export const addMemberToProjectService = async ({
  userId,
  projectId,
  assignedBy,
}: {
  userId: string;
  projectId: string;
  assignedBy: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found", "Project not found");
  }

  const isAdmin = await isUserAdminOfProject(assignedBy, projectId);
  if (!isAdmin) {
    throw new ApiError(
      403,
      "Only project admins can add members to projects",
      "Only project admins can add members to projects",
    );
  }

  const isOrgMember = await userMemberOfOrg(userId, project.organizationId);
  if (!isOrgMember) {
    throw new ApiError(
      400,
      "User is not a member of this organization",
      "User is not a member of this organization",
    );
  }

  return await addMemberToProject({ userId, projectId, assignedBy });
};
