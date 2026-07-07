import redis from "../configs/redis-client.config";
import { ApiError } from "../helpers/ApiError";
import { emailQueue } from "../queues/email.queue";
import { createNotificationService } from "./notifications.service";
import { findUserById } from "../repositories/users.repository";
import {
  addedToProjectEmailTemplate,
  projectCreatedEmailTemplate,
  removedFromProjectEmailTemplate,
} from "../utils/email-template.utils";
import {
  getOrgByAdminId,
  userMemberOfOrg,
} from "../repositories/organizations.repository";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getDashboardProjects,
  getProjectById,
  getProjectMembers,
  getProjectsByUserId,
  getProjectTaskStatusInfo,
  isUserAdminOfProject,
  isUserMemberOfProject,
  removeProjectMember,
  updateProject,
  updateProjectLogo,
} from "../repositories/projects.repository";
import { uploadToS3, getS3PresignedUrl, deleteFromS3 } from "./s3.service";

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

  const project = await createProject({
    name,
    organizationId,
    createdBy,
    ...(logoUrl && { logoUrl }),
  });

  const keys = await redis.keys(`projects:${organizationId}:*`);
  const dashboardKeys = await redis.keys(`dashboard:${organizationId}:*`);
  const toDelete = [...keys, ...dashboardKeys];
  if (toDelete.length) await redis.del(...toDelete);

  const creator = await findUserById(createdBy);
  if (creator) {
    await emailQueue.add("project-created", {
      to: creator.email,
      subject: `Your project "${name}" has been created`,
      html: projectCreatedEmailTemplate(creator.username, name, org.name),
    });
  }

  return project;
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

  const updated = await updateProject(projectId, {
    ...(name && { name }),
    ...(logoUrl && { logoUrl }),
    ...(status && { status }),
  });

  const keys = await redis.keys(`projects:${project.organizationId}:*`);
  const dashboardKeys = await redis.keys(`dashboard:${project.organizationId}:*`);
  const toDelete = [`project:${projectId}`, ...keys, ...dashboardKeys];
  await redis.del(...toDelete);

  return updated;
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
  const key = `projects:${organizationId}:${userId}:p${page}:l${limit}:q${search}`;
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  const raw = await getProjectsByUserId(userId, organizationId, {
    page,
    limit,
    search,
  });
  const data = await Promise.all(
    raw.data.map(async (row: any) => {
      const plain = row.toJSON ? row.toJSON() : { ...row };
      if (typeof plain.Project?.logoUrl === "string" && plain.Project.logoUrl.startsWith("uploads/")) {
        plain.Project.logoUrl = await getS3PresignedUrl(plain.Project.logoUrl);
      }
      return plain;
    }),
  );
  const projects = { ...raw, data };
  await redis.set(key, JSON.stringify(projects), "EX", 300);
  return projects;
};

export const getDashboardProjectsService = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  const key = `dashboard:${organizationId}:${userId}`;
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  const raw = await getDashboardProjects(userId, organizationId);
  const projects = await Promise.all(
    raw.map(async (row: any) => {
      const plain = row.toJSON ? row.toJSON() : { ...row };
      if (typeof plain.Project?.logoUrl === "string" && plain.Project.logoUrl.startsWith("uploads/")) {
        plain.Project.logoUrl = await getS3PresignedUrl(plain.Project.logoUrl);
      }
      return plain;
    }),
  );
  await redis.set(key, JSON.stringify(projects), "EX", 300);
  return projects;
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

  const keys = await redis.keys(`projects:${project.organizationId}:*`);
  const dashboardKeys = await redis.keys(`dashboard:${project.organizationId}:*`);
  const toDelete = [`project:${projectId}`, `project:${projectId}:members`, ...keys, ...dashboardKeys];
  await redis.del(...toDelete);
};

export const getProjectMembersService = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "Access denied", "Access denied");
  }
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found", "Project not found");
  }
  const cacheKey = `project:${projectId}:members`;
  const cached = await redis.get(cacheKey);
  let plain: any[];

  if (cached) {
    plain = JSON.parse(cached);
  } else {
    const members = await getProjectMembers(projectId);
    plain = members.map((m) => m.toJSON());
    await redis.set(cacheKey, JSON.stringify(plain), "EX", 300);
  }

  await Promise.all(
    plain.map(async (m) => {
      const url = m.member?.gravatarUrl;
      if (typeof url === "string" && url.startsWith("uploads/")) {
        m.member.gravatarUrl = await getS3PresignedUrl(url);
      }
    }),
  );

  return plain;
};

export const getProjectByIdService = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "Access denied", "Access denied");
  }
  const cacheKey = `project:${projectId}`;
  const cached = await redis.get(cacheKey);
  let plain: Record<string, unknown>;

  if (cached) {
    plain = JSON.parse(cached);
  } else {
    const project = await getProjectById(projectId);
    if (!project) throw new ApiError(404, "Project not found", "Project not found");
    plain = project.toJSON() as Record<string, unknown>;
    await redis.set(cacheKey, JSON.stringify(plain), "EX", 300);
  }

  if (typeof plain.logoUrl === "string" && plain.logoUrl.startsWith("uploads/")) {
    plain.logoUrl = await getS3PresignedUrl(plain.logoUrl);
  }
  return plain;
};

export const removeProjectMemberService = async ({
  projectId,
  targetUserId,
  requesterId,
}: {
  projectId: string;
  targetUserId: string;
  requesterId: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found", "Project not found");
  }

  const isAdmin = await isUserAdminOfProject(requesterId, projectId);
  if (!isAdmin) {
    throw new ApiError(
      403,
      "Only project admins can remove members",
      "Only project admins can remove members",
    );
  }

  const isMember = await isUserMemberOfProject(targetUserId, projectId);
  if (!isMember) {
    throw new ApiError(
      404,
      "User is not a member of this project",
      "User is not a member of this project",
    );
  }

  if (targetUserId === requesterId) {
    throw new ApiError(
      400,
      "You cannot remove yourself from the project",
      "You cannot remove yourself from the project",
    );
  }

  await removeProjectMember(targetUserId, projectId);

  const keys = await redis.keys(`projects:${project.organizationId}:*`);
  const dashboardKeys = await redis.keys(`dashboard:${project.organizationId}:*`);
  const toDelete = [`project:${projectId}:members`, ...keys, ...dashboardKeys];
  await redis.del(...toDelete);

  const removedUser = await findUserById(targetUserId);
  if (removedUser) {
    await createNotificationService({
      userId: removedUser.id,
      orgId: project.organizationId,
      projectId,
      title: "Removed from project",
      message: `You have been removed from project: ${project.name}`,
      href: `${process.env.FRONTEND_ORIGIN_PROD || process.env.FRONTEND_ORIGIN}/organization/${project.organizationId}/projects`,
    });
    await emailQueue.add(
      "project-member-removed",
      {
        to: removedUser.email,
        subject: `You've been removed from project: ${project.name}`,
        html: removedFromProjectEmailTemplate(removedUser.username, project.name),
      },
      { attempts: 3, backoff: { type: "exponential", delay: 5000 } },
    );
  }
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

  const result = await addMemberToProject({ userId, projectId, assignedBy });

  const keys = await redis.keys(`projects:${project.organizationId}:*`);
  const dashboardKeys = await redis.keys(`dashboard:${project.organizationId}:*`);
  const toDelete = [`project:${projectId}:members`, ...keys, ...dashboardKeys];
  await redis.del(...toDelete);

  const addedUser = await findUserById(userId);
  const adder = await findUserById(assignedBy);
  if (addedUser && adder) {
    await createNotificationService({
      userId: addedUser.id,
      orgId: project.organizationId,
      projectId,
      title: "Added to project",
      message: `${adder.username} added you to project: ${project.name}`,
      href: `${process.env.FRONTEND_ORIGIN_PROD || process.env.FRONTEND_ORIGIN}/organization/${project.organizationId}/projects/${projectId}`,
    });
    await emailQueue.add(
      "project-member-added",
      {
        to: addedUser.email,
        subject: `You've been added to project: ${project.name}`,
        html: addedToProjectEmailTemplate(
          addedUser.username,
          project.name,
          adder.username,
          adder.gravatarUrl?.startsWith("uploads/")
            ? await getS3PresignedUrl(adder.gravatarUrl)
            : (adder.gravatarUrl ?? undefined),
        ),
      },
      { attempts: 3, backoff: { type: "exponential", delay: 5000 } },
    );
  }

  return result;
};

export const uploadProjectLogoService = async ({
  projectId,
  userId,
  file,
}: {
  projectId: string;
  userId: string;
  file: Express.Multer.File;
}) => {
  const isAdmin = await isUserAdminOfProject(userId, projectId);
  if (!isAdmin) throw new ApiError(403, "Forbidden", "Only an org admin can upload a project logo");

  const project = await getProjectById(projectId);
  const oldKey = project?.logoUrl?.startsWith("uploads/") ? project.logoUrl : null;

  const { key } = await uploadToS3(file);
  const updated = await updateProjectLogo(projectId, key);

  if (oldKey) deleteFromS3(oldKey).catch(() => {});

  await redis.del(`project:${projectId}`);
  const url = await getS3PresignedUrl(key);
  return { project: updated, url };
};

export const getProjectTaskStatsService = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) throw new ApiError(403, "Forbidden", "You are not a member of this project");
  return getProjectTaskStatusInfo(projectId);
};
