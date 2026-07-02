import redis from "../configs/redis-client.config";
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
  getAssignedToTaskUserDetails,
  getTaskById,
  getTasksAssignedToUser,
  getTasksAssignedToUserInProject,
  getTasksInProject,
  getUserTasksForCalendar,
  reassignTaskToAnotherUser,
  updateTask,
  updateTaskPosition,
  updateTaskStatus,
} from "../repositories/tasks.repository";
import { findUserById } from "../repositories/users.repository";
import { emailQueue } from "../queues/email.queue";
import { taskAssignedEmailTemplate } from "../utils/email-template.utils";
import { TaskPriority, TaskStatus } from "../types/tasks";
import { createNotificationService } from "./notifications.service";

export const createTaskService = async (data: {
  title: string;
  description: string;
  assignedTo?: string;
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
  if (data.assignedTo) {
    const isMember = await isUserMemberOfProject(
      data.assignedTo,
      data.projectId,
    );
    if (!isMember) {
      throw new ApiError(
        400,
        "The user you are trying to assign the task to is not a member of the project.",
        "User not a member of project",
      );
    }
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
  const task = await createTask(data);

  const keys = await redis.keys(`tasks:${data.projectId}:*`);
  if (keys.length) await redis.del(...keys);
  if (data.assignedTo) {
    await redis.del(`tasks:user:${data.assignedTo}`);
    await redis.del(`tasks:${data.projectId}:user:${data.assignedTo}`);

    const assignee = await findUserById(data.assignedTo);
    const assigner = await findUserById(data.assignedBy);
    if (assignee && assigner) {
      await createNotificationService({
        userId: assignee.id,
        orgId: project.organizationId,
        projectId: data.projectId,
        title: "Task assigned",
        message: `You have been assigned a new task: ${data.title} in project ${project.name}`,
        href: `${process.env.FRONTEND_ORIGIN}/organization/${project.organizationId}/projects/${data.projectId}/tasks/${task.id}`,
      });
      await emailQueue.add(
        "task-assigned",
        {
          to: assignee.email,
          subject: `You've been assigned a new task: ${data.title}`,
          html: taskAssignedEmailTemplate(
            assignee.username,
            data.title,
            project.name,
            assigner.username,
            assigner.gravatarUrl ?? undefined,
          ),
        },
        { attempts: 3, backoff: { type: "exponential", delay: 5000 } },
      );
    }
  }

  return task;
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
  const key = `tasks:${projectId}:p${page}:l${limit}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const result = await getTasksInProject(projectId, page, limit);
  await redis.set(key, JSON.stringify(result), "EX", 300);
  return result;
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
  const key = `task:${taskId}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(
      404,
      "Task with the given ID does not exist.",
      "Task not found",
    );
  }
  const assignedTaskUserDetails = task.assignedTo
    ? await getAssignedToTaskUserDetails({
        projectId: task.projectId,
        taskId: task.id,
        userId: task.assignedTo,
      })
    : null;
  const result = { task, assignedTaskUserDetails };
  await redis.set(key, JSON.stringify(result), "EX", 300);
  return result;
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
  const key = `tasks:user:${userId}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const tasks = await getTasksAssignedToUser(userId);
  await redis.set(key, JSON.stringify(tasks), "EX", 300);
  return tasks;
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
      "Only members of the project can delete tasks.",
    );
  }
  const isOrgAdmin = await getOrgByAdminId(userId, project.organizationId);
  if (!isOrgAdmin) {
    throw new ApiError(403, "Forbidden", "Only org admins can delete tasks.");
  }
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(
      404,
      "Task with the given ID does not exist.",
      "Task not found",
    );
  }
  const result = await deleteTask(taskId);

  const keys = await redis.keys(`tasks:${projectId}:*`);
  const toDelete = [`task:${taskId}`, ...keys];
  if (task.assignedTo) {
    toDelete.push(`tasks:user:${task.assignedTo}`);
  }
  if (toDelete.length) await redis.del(...toDelete);

  return result;
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
      "Only members of the project can update tasks.",
    );
  }
  const isOrgAdmin = await getOrgByAdminId(userId, project.organizationId);
  if (!isOrgAdmin) {
    throw new ApiError(403, "Forbidden", "Only org admins can update tasks.");
  }
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(
      404,
      "Task with the given ID does not exist.",
      "Task not found",
    );
  }
  const updated = await updateTask(taskId, data);

  const keys = await redis.keys(`tasks:${projectId}:*`);
  const toDelete = [`task:${taskId}`, ...keys];
  if (task.assignedTo) toDelete.push(`tasks:user:${task.assignedTo}`);
  if (toDelete.length) await redis.del(...toDelete);

  return updated;
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
  const key = `tasks:${projectId}:user:${userId}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const tasks = await getTasksAssignedToUserInProject(userId, projectId);
  await redis.set(key, JSON.stringify(tasks), "EX", 300);
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
      "Only members of the project can update tasks.",
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
  await updateTaskStatus(taskId, status, position);

  const keys = await redis.keys(`tasks:${projectId}:*`);
  const toDelete = [`task:${taskId}`, ...keys];
  if (task.assignedTo) toDelete.push(`tasks:user:${task.assignedTo}`);
  if (toDelete.length) await redis.del(...toDelete);
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
      "Only members of the project can update tasks.",
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
  await updateTaskPosition(taskId, position);

  const keys = await redis.keys(`tasks:${projectId}:*`);
  const toDelete = [`task:${taskId}`, ...keys];
  if (toDelete.length) await redis.del(...toDelete);
};

export const getUserTasksForCalendarService = async ({
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
      "Only members of the organization can view their calendar tasks.",
    );
  }
  const key = `tasks:calendar:${orgId}:${userId}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const tasks = await getUserTasksForCalendar({ userId, orgId });
  await redis.set(key, JSON.stringify(tasks), "EX", 300);
  return tasks;
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
  const result = await reassignTaskToAnotherUser({ taskId, newUserId });

  const keys = await redis.keys(`tasks:${projectId}:*`);
  const toDelete = [`task:${taskId}`, ...keys];
  // invalidate both old and new assignee's user-level caches
  if (task.assignedTo) toDelete.push(`tasks:user:${task.assignedTo}`);
  toDelete.push(`tasks:user:${newUserId}`);
  if (toDelete.length) await redis.del(...toDelete);

  const newAssignee = await findUserById(newUserId);
  const assigner = await findUserById(userId);
  if (newAssignee && assigner) {
    await createNotificationService({
      userId: newAssignee.id,
      orgId: project.organizationId,
      title: "Task assigned",
      message: `You have been assigned a task: ${task.title} in project ${project.name}`,
      href: `${process.env.FRONTEND_ORIGIN}/organization/${project.organizationId}/projects/${projectId}/tasks/${taskId}`,
    });
    await emailQueue.add(
      "task-assigned",
      {
        to: newAssignee.email,
        subject: `You've been assigned a task: ${task.title}`,
        html: taskAssignedEmailTemplate(
          newAssignee.username,
          task.title,
          project.name,
          assigner.username,
          assigner.gravatarUrl ?? undefined,
        ),
      },
      { attempts: 3, backoff: { type: "exponential", delay: 5000 } },
    );
  }

  return result;
};
