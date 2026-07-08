import z from "zod";

export const getOrgActivityLogsSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
  }),
  query: z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  }),
});

export const getTaskActivityLogsSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
    taskId: z.uuidv4("Invalid task ID"),
  }),
  query: z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  }),
});
