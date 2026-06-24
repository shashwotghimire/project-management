import { ApiError } from "../helpers/ApiError";
import {
  getOrgByAdminId,
  userMemberOfOrg,
} from "../repositories/organizations.repository";
import {
  getProjectById,
  isUserMemberOfProject,
} from "../repositories/projects.repository";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksAssignedToUser,
  getTasksAssignedToUserInProject,
  getTasksInProject,
  reassignTaskToAnotherUser,
  updateTask,
  updateTaskPosition,
  updateTaskStatus,
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
  page,
  limit,
}: {
  projectId: string;
  userId: string;
  page: number;
  limit: number;
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
  return await getTasksInProject(projectId, page, limit);
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

export const deleteTaskService = async ({
  taskId,
  projectId,
  userId,
}: {
  taskId: string;
  projectId: string;
  userId: string;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project with the given ID does not exist.", "Project not found");
  }
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "Forbidden", "Only members of the project can delete tasks.");
  }
  const isOrgAdmin = await getOrgByAdminId(userId, project.organizationId);
  if (!isOrgAdmin) {
    throw new ApiError(403, "Forbidden", "Only org admins can delete tasks.");
  }
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(404, "Task with the given ID does not exist.", "Task not found");
  }
  return await deleteTask(taskId);
};

export const updateTaskService = async ({
  taskId,
  projectId,
  userId,
  data,
}: {
  taskId: string;
  projectId: string;
  userId: string;
  data: {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
  };
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project with the given ID does not exist.", "Project not found");
  }
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "Forbidden", "Only members of the project can update tasks.");
  }
  const isOrgAdmin = await getOrgByAdminId(userId, project.organizationId);
  if (!isOrgAdmin) {
    throw new ApiError(403, "Forbidden", "Only org admins can update tasks.");
  }
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(404, "Task with the given ID does not exist.", "Task not found");
  }
  return await updateTask(taskId, data);
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

export const updateTaskStatusService = async ({
  taskId,
  projectId,
  userId,
  status,
  position,
}: {
  taskId: string;
  projectId: string;
  userId: string;
  status: TaskStatus;
  position: number;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project with the given ID does not exist.", "Project not found");
  }
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "Forbidden", "Only members of the project can update tasks.");
  }
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(404, "Task with the given ID does not exist.", "Task not found");
  }
  return await updateTaskStatus(taskId, status, position);
};

export const updateTaskPositionService = async ({
  taskId,
  projectId,
  userId,
  position,
}: {
  taskId: string;
  projectId: string;
  userId: string;
  position: number;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, "Project with the given ID does not exist.", "Project not found");
  }
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "Forbidden", "Only members of the project can update tasks.");
  }
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(404, "Task with the given ID does not exist.", "Task not found");
  }
  return await updateTaskPosition(taskId, position);
};

export const reassignTaskToAnotherUserService = async ({
  taskId,
  newUserId,
  projectId,
  userId,
}: {
  taskId: string;
  newUserId: string;
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
      "Only members of the project can reassign tasks.",
    );
  }
  const isMemberOrgAdmin = await getOrgByAdminId(
    userId,
    project.organizationId,
  );
  if (!isMemberOrgAdmin) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only members who are admins can reassign tasks.",
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
  const isNewUserMember = await isUserMemberOfProject(newUserId, projectId);
  if (!isNewUserMember) {
    throw new ApiError(
      400,
      "The user you are trying to assign the task to is not a member of the project.",
      "User not a member of project",
    );
  }
  return await reassignTaskToAnotherUser({ taskId, newUserId });
};
