import z from "zod";

export const getUserNotificationsSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
  }),
});

export const deleteNotificationSchema = z.object({
  params: z.object({
    orgId: z.uuidv4("Invalid organization ID"),
    notificationId: z.uuidv4("Invalid notification ID"),
  }),
});
