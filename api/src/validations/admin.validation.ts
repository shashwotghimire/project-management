import z from "zod";

export const getOrganizationsSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1))
      .refine((val) => val > 0, "Page must be a positive integer"),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10))
      .refine((val) => val > 0, "Limit must be a positive integer"),
    query: z.string().optional(),
  }),
});

export const getOrganizationDetailsSchema = z.object({
  params: z.object({
    orgId: z.string().uuid("Invalid organization ID"),
  }),
});

export const blockOrganizationSchema = z.object({
  params: z.object({
    orgId: z.string().uuid("Invalid organization ID"),
  }),
});

export const unblockOrganizationSchema = z.object({
  params: z.object({
    orgId: z.string().uuid("Invalid organization ID"),
  }),
});

export const getUsersSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1))
      .refine((val) => val > 0, "Page must be a positive integer"),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10))
      .refine((val) => val > 0, "Limit must be a positive integer"),
    query: z.string().optional(),
  }),
});
