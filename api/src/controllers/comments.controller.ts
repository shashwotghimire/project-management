import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";
import {
  createCommentService,
  deleteCommentService,
  getCommentsByTaskService,
  updateCommentService,
} from "../services/comments.service";

export const createComment = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const projectId = isString(req.params.projectId);
    const orgId = isString(req.params.orgId);
    const authorId = req.user.id;
    const { content } = req.body;

    const comment = await createCommentService({
      content,
      taskId,
      projectId,
      organizationId: orgId,
      authorId,
    });
    return res
      .status(201)
      .json(new ApiResponse(true, "Comment created successfully", comment));
  },
);

export const getCommentsByTask = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const taskId = isString(req.params.taskId);
    const projectId = isString(req.params.projectId);
    const userId = req.user.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const comments = await getCommentsByTaskService({
      taskId,
      projectId,
      userId,
      page,
      limit,
    });
    return res
      .status(200)
      .json(new ApiResponse(true, "Comments fetched successfully", comments));
  },
);

export const updateComment = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const commentId = isString(req.params.commentId);
    const userId = req.user.id;
    const { content } = req.body;

    const comment = await updateCommentService({ commentId, userId, content });
    return res
      .status(200)
      .json(new ApiResponse(true, "Comment updated successfully", comment));
  },
);

export const deleteComment = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const commentId = isString(req.params.commentId);
    const projectId = isString(req.params.projectId);
    const orgId = isString(req.params.orgId);
    const userId = req.user.id;

    await deleteCommentService({
      commentId,
      userId,
      projectId,
      organizationId: orgId,
    });
    return res
      .status(200)
      .json(new ApiResponse(true, "Comment deleted successfully", null));
  },
);
