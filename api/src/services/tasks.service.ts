import { ApiError } from "../helpers/ApiError";
import {
  getOrgByAdminId,
  userMemberOfOrg,
} from "../repositories/organizations.repository";
import {
  getProjectById,
  isUserMemberOfProject,
  isUserMemberOfProject,
} from "../repositories/projects.repository";
import {
  createTask,
  getTaskById,
  getTasksAssignedToUser,
  getTasksAssignedToUserInProject,
  getTasksInProject,
} from "../repositories/tasks.repository";
import { TaskPriority, TaskStatus } from "../types/tasks";

export const createTaskService = async (data: {
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  createdBy: string;
  projectId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}) => {
  const project = await getProjectById(data.projectId);
  if (!project) {
    throw new ApiError(
      404,
      "Project with the given ID does not exist.",
      "Project not found",
    );
  }
  const isMember = await isUserMemberOfProject(data.assignedTo, data.projectId);
  if (!isMember) {
    throw new ApiError(
      400,
      "The user you are trying to assign the task to is not a member of the project.",
      "User not a member of project",
    );
  }
  const creatorIsMember = await isUserMemberOfProject(
    data.createdBy,
    data.projectId,
  );
  if (!creatorIsMember) {
    throw new ApiError(
      400,
      "The user you are trying to create the task is not a member of the project.",
      "User not a member of project",
    );
  }
  const isCreatorOrgAdmin = await getOrgByAdminId(
    data.createdBy,
    project.organizationId,
  );
  if (!isCreatorOrgAdmin) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only members who are admins can create tasks.",
    );
  }
  return await createTask(data);
};

export const getTasksInProjectService = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(
      404,
      "Project with the given ID does not exist.",
      "Project not found",
    );
  }
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only members of the project can view the tasks.",
    );
  }
  return await getTasksInProject(projectId);
};

export const getTaskByIdService = async ({
  userId,
  taskId,
  projectId,
}: {
  userId: string;
  taskId: string;
  projectId: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(
      404,
      "Project with the given ID does not exist.",
      "Project not found",
    );
  }
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only members of the project can view the tasks.",
    );
  }
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(
      404,
      "Task with the given ID does not exist.",
      "Task not found",
    );
  }
  return task;
};

export const getTasksAssignedToUserService = async ({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) => {
  const isUserMemberOfOrg = await userMemberOfOrg(userId, orgId);
  if (!isUserMemberOfOrg) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only members of the organization can view the tasks assigned to them.",
    );
  }
  return await getTasksAssignedToUser(userId);
};

export const getTasksAssignedToUserInProjectService = async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(
      404,
      "Project with the given ID does not exist.",
      "Project not found",
    );
  }
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only members of the project can view the tasks assigned to them.",
    );
  }
  const tasks = await getTasksAssignedToUserInProject(userId, projectId);
  return tasks;
};
