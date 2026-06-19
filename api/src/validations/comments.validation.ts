import z from "zod";

const commentParams = z.object({
  orgId: z.uuidv4("Invalid organization ID"),
  projectId: z.uuidv4("Invalid project ID"),
  taskId: z.uuidv4("Invalid task ID"),
});

export const createCommentSchema = z.object({
  params: commentParams,
  body: z.object({
    content: z.string().min(1, "Content is required"),
  }),
});

export const getCommentsByTaskSchema = z.object({
  params: commentParams,
});

export const updateCommentSchema = z.object({
  params: commentParams.extend({
    commentId: z.uuidv4("Invalid comment ID"),
  }),
  body: z.object({
    content: z.string().min(1, "Content is required"),
  }),
});

export const deleteCommentSchema = z.object({
  params: commentParams.extend({
    commentId: z.uuidv4("Invalid comment ID"),
  }),
});
