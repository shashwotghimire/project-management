import { ApiError } from "../helpers/ApiError";
import { getS3PresignedUrl } from "./s3.service";
import { emailQueue } from "../queues/email.queue";
import { createNotificationService } from "./notifications.service";
import {
  getOrgByAdminId,
  getOrgById,
} from "../repositories/organizations.repository";
import { isUserMemberOfProject } from "../repositories/projects.repository";
import { getTaskById } from "../repositories/tasks.repository";
import { findUserById } from "../repositories/users.repository";
import { commentCreatedEmailTemplate } from "../utils/email-template.utils";
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

  const comment = await createComment(data);

  const author = await findUserById(data.authorId);
  const authorName = author?.username ?? "Someone";

  let recipientId: string | null = null;
  if (task.assignedTo && task.assignedTo !== data.authorId) {
    recipientId = task.assignedTo;
  } else if (!task.assignedTo) {
    const org = await getOrgById(data.organizationId);
    if (org && org.adminId !== data.authorId) {
      recipientId = org.adminId;
    }
  }

  if (recipientId) {
    const recipient = await findUserById(recipientId);
    if (recipient) {
      await createNotificationService({
        userId: recipient.id,
        orgId: data.organizationId,
        projectId: data.projectId,
        title: "New comment on your task",
        message: `${authorName} commented on task: ${task.title}`,
        href: `${process.env.FRONTEND_ORIGIN_PROD || process.env.FRONTEND_ORIGIN}/organization/${data.organizationId}/projects/${data.projectId}/tasks/${task.id}`,
      });
      await emailQueue.add("comment-created", {
        to: recipient.email,
        subject: `New comment on task: ${task.title}`,
        html: commentCreatedEmailTemplate(
          recipient.username,
          authorName,
          task.title,
          data.content,
        ),
      });
    }
  }

  return comment;
};

export const getCommentsByTaskService = async ({
  taskId,
  projectId,
  userId,
  page,
  limit,
}: {
  taskId: string;
  projectId: string;
  userId: string;
  page: number;
  limit: number;
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
  const raw = await getCommentsByTask(taskId, { page, limit });
  const comments = await Promise.all(
    raw.comments.map(async (row: any) => {
      const plain = row.toJSON ? row.toJSON() : { ...row };
      if (typeof plain.author?.gravatarUrl === "string" && plain.author.gravatarUrl.startsWith("uploads/")) {
        plain.author.gravatarUrl = await getS3PresignedUrl(plain.author.gravatarUrl);
      }
      return plain;
    }),
  );
  return { ...raw, comments };
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
