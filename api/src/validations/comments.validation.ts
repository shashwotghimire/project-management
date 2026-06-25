import z from "zod";

const commentParams = z.object({
  orgId: z.uuidv4("Invalid organization ID"),
  projectId: z.uuidv4("Invalid project ID"),
  taskId: z.uuidv4("Invalid task ID"),
});

export const createCommentSchema = z.object({
  params: commentParams,
  body: z.object({
    content: z.string().min(1, "Content is required").max(115, "Comment cannot exceed 115 characters"),
  }),
});

export const getCommentsByTaskSchema = z.object({
  params: commentParams,
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),
});

export const updateCommentSchema = z.object({
  params: commentParams.extend({
    commentId: z.uuidv4("Invalid comment ID"),
  }),
  body: z.object({
    content: z.string().min(1, "Content is required").max(115, "Comment cannot exceed 115 characters"),
  }),
});

export const deleteCommentSchema = z.object({
  params: commentParams.extend({
    commentId: z.uuidv4("Invalid comment ID"),
  }),
});
