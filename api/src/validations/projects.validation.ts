import z from "zod";

export const createProjectSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
  }),
  body: z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    logoUrl: z.url("Invalid URL format").optional(),
  }),
});

export const deleteProjectSchema = z.object({
  params: z.object({
    projectId: z.uuidv4("Invalid project ID"),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    projectId: z.uuidv4("Invalid project ID"),
  }),
  body: z.object({
    name: z
      .string()
      .min(3, "Project name must be at least 3 characters")
      .optional(),
    logoUrl: z.url("Invalid URL format").optional(),
  }),
});

export const getUserProjectsSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
  }),
});

export const addMemberToProjectSchema = z.object({
  params: z.object({
    projectId: z.uuidv4("Invalid project ID"),
  }),
  body: z.object({
    userId: z.uuidv4("Invalid user ID"),
  }),
});
