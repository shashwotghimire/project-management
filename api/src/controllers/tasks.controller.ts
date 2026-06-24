import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Response } from "express";
import {
  createTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTasksAssignedToUserInProjectService,
  getTasksAssignedToUserService,
  getTasksInProjectService,
  reassignTaskToAnotherUserService,
  updateTaskService,
  updateTaskStatusService,
  updateTaskPositionService,
} from "../services/tasks.service";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";

export const getTasksAssignedToUser = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const userId = req.user.id;
    const tasks = await getTasksAssignedToUserService({ userId, orgId });
    return res
      .status(200)
      .json(new ApiResponse(true, "Tasks fetched successfully", tasks));
  },
);

export const createTask = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const createdBy = req.user.id;
    const { title, description, assignedTo, status, priority, dueDate } =
      req.body;

    const task = await createTaskService({
      title,
      description,
      assignedTo,
      assignedBy: createdBy,
      createdBy,
      projectId,
      status,
      priority,
      dueDate,
    });
    return res
      .status(201)
      .json(new ApiResponse(true, "Task created successfully", task));
  },
);

export const getTasksInProject = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;
    const tasks = await getTasksInProjectService({ projectId, userId });
    return res
      .status(200)
      .json(new ApiResponse(true, "Tasks fetched successfully", tasks));
  },
);

export const getTaskById = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;
    const task = await getTaskByIdService({ taskId, userId, projectId });
    return res
      .status(200)
      .json(new ApiResponse(true, "Task fetched successfully", task));
  },
);

export const getTasksAssignedToUserInProject = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;
    const tasks = await getTasksAssignedToUserInProjectService({
      userId,
      projectId,
    });
    return res
      .status(200)
      .json(new ApiResponse(true, "Tasks fetched successfully", tasks));
  },
);

export const deleteTask = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;
    await deleteTaskService({ taskId, projectId, userId });
    return res
      .status(200)
      .json(new ApiResponse(true, "Task deleted successfully", null));
  },
);

export const updateTask = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;
    const { title, description, status, priority, dueDate } = req.body;

    const task = await updateTaskService({
      taskId,
      projectId,
      userId,
      data: { title, description, status, priority, dueDate },
    });
    return res
      .status(200)
      .json(new ApiResponse(true, "Task updated successfully", task));
  },
);

export const updateTaskStatus = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;
    const { status, position } = req.body;
    await updateTaskStatusService({ taskId, projectId, userId, status, position });
    return res.status(200).json(new ApiResponse(true, "Task status updated successfully", null));
  },
);

export const updateTaskPosition = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;
    const { position } = req.body;
    await updateTaskPositionService({ taskId, projectId, userId, position });
    return res.status(200).json(new ApiResponse(true, "Task position updated successfully", null));
  },
);

export const reassignTaskToAnotherUser = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const newUserId = isString(req.body.newUserId);
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;

    await reassignTaskToAnotherUserService({
      taskId,
      newUserId,
      userId,
      projectId,
    });
    return res
      .status(200)
      .json(new ApiResponse(true, "Task reassigned successfully", null));
  },
);
