import z from "zod";

export const getTasksSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
  }),
});

export const getTasksAssignedToUserSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
  }),
});

export const getTasksAssignedToUserInProjectSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
  }),
});

export const getTaskByIdSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
    taskId: z.uuidv4("Invalid task ID"),
  }),
});

export const createTaskSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
  }),
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    assignedTo: z.uuidv4("Invalid user ID"),
    status: z.enum(["todo", "in_progress", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.iso.date("Invalid date format").optional(),
  }),
});
