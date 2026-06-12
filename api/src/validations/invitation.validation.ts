import z from "zod";

export const createInvitationSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address").trim().toLowerCase(),
    organizationId: z.uuid("Invalid organization ID"),
  }),
});

export const respondToInvitationSchema = z.object({
  query: z.object({
    token: z.string().trim(),
  }),
  body: z.object({
    response: z.enum(["accepted", "declined"]),
  }),
});
