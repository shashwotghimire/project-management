import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiResponse } from "../helpers/ApiResponse";
import {
  addMemberToProjectService,
  createProjectService,
  deleteProjectService,
  getUserProjectsService,
  updateProjectService,
} from "../services/projects.service";
import { isString } from "../helpers/check-string.helper";

export const createProject = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const { orgId } = req.params;
    const organizationId = isString(orgId);
    const { name, logoUrl } = req.body;
    const createdBy = req.user.id;

    const project = await createProjectService({
      name,
      organizationId,
      createdBy,
      logoUrl,
    });

    return res
      .status(201)
      .json(new ApiResponse(true, "Project created successfully", project));
  },
);

export const getUserProjects = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const organizationId = isString(req.params.orgId);
    const userId = req.user.id;

    const projects = await getUserProjectsService({ userId, organizationId });

    return res
      .status(200)
      .json(new ApiResponse(true, "Projects fetched successfully", projects));
  },
);

export const updateProject = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const { name, logoUrl } = req.body;
    const userId = req.user.id;

    const updated = await updateProjectService({
      projectId,
      userId,
      name,
      logoUrl,
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Project updated successfully", updated));
  },
);

export const deleteProject = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;

    await deleteProjectService({ projectId, userId });

    return res
      .status(200)
      .json(new ApiResponse(true, "Project deleted successfully", null));
  },
);

export const addMemberToProject = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const { userId } = req.body;
    const assignedBy = req.user.id;

    const member = await addMemberToProjectService({
      userId,
      projectId,
      assignedBy,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(true, "Member added to project successfully", member),
      );
  },
);
