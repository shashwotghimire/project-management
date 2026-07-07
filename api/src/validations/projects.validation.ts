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
    logoUrl: z.url("Invalid URL format").nullable().optional(),
    status: z.enum(["active", "inactive", "archived"]).optional(),
  }),
});

export const getUserProjectsSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
  }),
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().optional(),
  }),
});

export const getDashboardProjectsSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
  }),
});

export const getProjectByIdSchema = z.object({
  params: z.object({
    projectId: z.uuidv4("Invalid project ID"),
  }),
});

export const getProjectMembersSchema = z.object({
  params: z.object({
    projectId: z.uuidv4("Invalid project ID"),
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

export const removeProjectMemberSchema = z.object({
  params: z.object({
    projectId: z.uuidv4("Invalid project ID"),
    userId: z.uuidv4("Invalid user ID"),
  }),
});

export const getProjectTaskStatsSchema = z.object({
  params: z.object({
    projectId: z.uuidv4("Invalid project ID"),
  }),
});

export const uploadProjectLogoSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    projectId: z.uuidv4("Invalid project ID"),
  }),
});
