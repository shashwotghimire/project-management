import { ApiError } from "../helpers/ApiError";
import { getOrgByAdminId } from "../repositories/organizations.repository";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getProjectById,
  getProjectsByUserId,
  isUserAdminOfProject,
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
}: {
  projectId: string;
  userId: string;
  name?: string;
  logoUrl?: string;
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
  });
};

export const getUserProjectsService = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  return await getProjectsByUserId(userId, organizationId);
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
  return await addMemberToProject({ userId, projectId, assignedBy });
};
