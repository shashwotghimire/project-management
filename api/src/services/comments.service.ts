import { ApiError } from "../helpers/ApiError";
import { getOrgByAdminId } from "../repositories/organizations.repository";
import { isUserMemberOfProject } from "../repositories/projects.repository";
import { getTaskById } from "../repositories/tasks.repository";
import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentsByTask,
  updateComment,
} from "../repositories/comments.repository";

export const createCommentService = async (data: {
  content: string;
  taskId: string;
  projectId: string;
  organizationId: string;
  authorId: string;
}) => {
  const task = await getTaskById(data.taskId);
  if (!task) {
    throw new ApiError(
      404,
      "Task with the given ID does not exist.",
      "Task not found",
    );
  }
  if (task.projectId !== data.projectId) {
    throw new ApiError(
      400,
      "Task does not belong to the given project.",
      "Task/project mismatch",
    );
  }
  const isMember = await isUserMemberOfProject(data.authorId, data.projectId);
  if (!isMember) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only project members can comment on tasks.",
    );
  }
  return await createComment(data);
};

export const getCommentsByTaskService = async ({
  taskId,
  projectId,
  userId,
}: {
  taskId: string;
  projectId: string;
  userId: string;
}) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(
      404,
      "Task with the given ID does not exist.",
      "Task not found",
    );
  }
  if (task.projectId !== projectId) {
    throw new ApiError(
      400,
      "Task does not belong to the given project.",
      "Task/project mismatch",
    );
  }
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only project members can view comments.",
    );
  }
  return await getCommentsByTask(taskId);
};

export const updateCommentService = async ({
  commentId,
  userId,
  content,
}: {
  commentId: string;
  userId: string;
  content: string;
}) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(
      404,
      "Comment with the given ID does not exist.",
      "Comment not found",
    );
  }
  if (comment.authorId !== userId) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only the comment author can edit this comment.",
    );
  }
  return await updateComment(commentId, { content });
};

export const deleteCommentService = async ({
  commentId,
  userId,
  projectId,
  organizationId,
}: {
  commentId: string;
  userId: string;
  projectId: string;
  organizationId: string;
}) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(
      404,
      "Comment with the given ID does not exist.",
      "Comment not found",
    );
  }
  const isAuthor = comment.authorId === userId;
  const isOrgAdmin = await getOrgByAdminId(userId, organizationId);
  if (!isAuthor && !isOrgAdmin) {
    throw new ApiError(
      403,
      "Forbidden",
      "Only the comment author or an org admin can delete this comment.",
    );
  }
  return await deleteComment(commentId);
};
