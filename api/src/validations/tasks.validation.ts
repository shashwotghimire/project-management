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

export const deleteTaskSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
    taskId: z.uuidv4("Invalid task ID"),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
    taskId: z.uuidv4("Invalid task ID"),
  }),
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(["todo", "in_progress", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.iso.date("Invalid date format").optional(),
  }).refine(
    (b) => Object.values(b).some((v) => v !== undefined),
    { message: "At least one field must be provided" },
  ),
});

export const reassignTaskSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
    taskId: z.uuidv4("Invalid task ID"),
  }),
  body: z.object({
    newUserId: z.uuidv4("Invalid user ID"),
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
