import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Response } from "express";
import {
  createTaskService,
  getTaskByIdService,
  getTasksAssignedToUserInProjectService,
  getTasksAssignedToUserService,
  getTasksInProjectService,
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
