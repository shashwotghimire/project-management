import { Tasks } from "../models/tasks.model";
import { TaskPriority, TaskStatus } from "../types/tasks";

export const createTask = async (data: {
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  createdBy: string;
  projectId: string;
  status: TaskStatus;
  priority: TaskPriority;
  position?: number;
  dueDate?: string;
}) => {
  return await Tasks.create({
    title: data.title,
    description: data.description,
    projectId: data.projectId,
    priority: data.priority,
    status: data.status,
    createdBy: data.assignedBy,
    assignedBy: data.assignedBy,
    assignedTo: data.assignedTo,
    position: data.position,
    dueDate: data.dueDate,
  });
};

export const getTasksInProject = async (projectId: string) => {
  return await Tasks.findAll({ where: { projectId } });
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
  return await Tasks.update(data, { where: { id: taskId } });
};

export const deleteTask = async (taskId: string) => {
  return await Tasks.destroy({ where: { id: taskId } });
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
