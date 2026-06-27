import { Op } from "sequelize";
import { sequelize } from "../configs/db.config";
import { Tasks } from "../models/tasks.model";
import { TaskPriority, TaskStatus } from "../types/tasks";
import { User } from "../models/users.model";
import { Organization } from "../models/organizations.model";
import { Project } from "../models/projects.model";
import { ProjectMembers } from "../models/project-members.model";

export const createTask = async (data: {
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
  const count = await Tasks.count({
    where: { projectId: data.projectId, status: data.status ?? "todo" },
  });

  return await Tasks.create({
    title: data.title,
    description: data.description,
    projectId: data.projectId,
    priority: data.priority,
    status: data.status,
    createdBy: data.createdBy,
    assignedBy: data.assignedBy,
    assignedTo: data.assignedTo ?? null,
    position: count,
    dueDate: data.dueDate ?? null,
  });
};

export const getTasksInProject = async (
  projectId: string,
  page: number = 1,
  limit: number = 20,
) => {
  const offset = (page - 1) * limit;
  const { rows, count } = await Tasks.findAndCountAll({
    where: { projectId },
    limit,
    offset,
    order: [["position", "ASC"]],
  });
  return { tasks: rows, total: count, page, limit };
};

export const getTaskById = async (taskId: string) => {
  return await Tasks.findByPk(taskId);
};

export const getTasksAssignedToUser = async (userId: string) => {
  return await Tasks.findAll({ where: { assignedTo: userId } });
};

export const getTasksAssignedToUserInProject = async (
  userId: string,
  projectId: string,
) => {
  return await Tasks.findAll({ where: { assignedTo: userId, projectId } });
};

export const updateTask = async (
  taskId: string,
  data: {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
  },
) => {
  await Tasks.update(data, { where: { id: taskId } });
  return await Tasks.findByPk(taskId);
};

export const deleteTask = async (taskId: string) => {
  return await Tasks.destroy({ where: { id: taskId } });
};

export const updateTaskStatus = async (
  taskId: string,
  status: TaskStatus,
  position: number,
) => {
  const task = await Tasks.findByPk(taskId);
  const oldStatus = task?.status;
  const oldPosition = task?.position;
  await sequelize.transaction(async (t) => {
    await Tasks.decrement("position", {
      by: 1,
      where: {
        projectId: task?.projectId,
        status: oldStatus,
        position: { [Op.gt]: oldPosition },
      },
      transaction: t,
    });
    await Tasks.increment("position", {
      by: 1,
      where: {
        projectId: task?.projectId,
        status,
        position: { [Op.gt]: position },
      },
      transaction: t,
    });
    await task?.update({ position, status }, { transaction: t });
  });
};

export const updateTaskPosition = async (taskId: string, position: number) => {
  const task = await Tasks.findByPk(taskId);
  const oldPosition = task?.position;
  await sequelize.transaction(async (t) => {
    if (position > oldPosition!) {
      await Tasks.decrement("position", {
        by: 1,
        where: {
          projectId: task?.projectId,
          status: task?.status,
          position: { [Op.gt]: oldPosition, [Op.lte]: position },
        },
        transaction: t,
      });
    } else {
      await Tasks.increment("position", {
        by: 1,
        where: {
          projectId: task?.projectId,
          status: task?.status,
          position: { [Op.lt]: oldPosition, [Op.gte]: position },
        },
        transaction: t,
      });
    }
    await task?.update({ position }, { transaction: t });
  });
};

export const reassignTaskToAnotherUser = async ({
  taskId,
  newUserId,
}: {
  taskId: string;
  newUserId: string;
}) => {
  return await Tasks.update(
    { assignedTo: newUserId },
    { where: { id: taskId } },
  );
};

export const getAssignedToTaskUserDetails = async ({
  projectId,
  taskId,
  userId,
}: {
  projectId: string;
  taskId: string;
  userId: string;
}) => {
  const user = await Tasks.findOne({
    where: {
      id: taskId,
      projectId,
      assignedTo: userId,
    },
    attributes: [],
    include: {
      model: User,
      as: "assignee",
      // attributes: ["id", "username", "email", "gravatarUrl"],
    },
  });
  return user;
};

export const getUserTasksForCalendar = async ({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) => {
  return await Tasks.findAll({
    where: {
      assignedTo: userId,
      dueDate: { [Op.ne]: null },
    },
    include: [
      {
        model: Project,
        as: "project",
        where: { organizationId: orgId },
        required: true,
        attributes: ["id", "name"],
        include: [
          {
            model: ProjectMembers,
            where: { userId },
            attributes: [],
            required: true,
          },
        ],
      },
    ],
  });
};
