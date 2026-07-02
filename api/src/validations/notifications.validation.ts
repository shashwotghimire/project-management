import z from "zod";

export const getUserNotificationsSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
  }),
});
