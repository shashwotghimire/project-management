import z from "zod";

export const createOrganizationSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Organization name must be at least 3 characters"),
  }),
});

export const getUsersOrganizationsSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 1))
      .refine((val) => val > 0, "Page must be a positive integer"),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 10))
      .refine((val) => val > 0, "Limit must be a positive integer"),
    query: z.string().optional(),
  }),
});
