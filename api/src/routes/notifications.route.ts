import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  deleteNotificationSchema,
  getUserNotificationsSchema,
} from "../validations/notifications.validation";
import {
  deleteNotification,
  getUserNotifications,
} from "../controllers/notifications.controller";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, validate(getUserNotificationsSchema), getUserNotifications);
router.delete("/:notificationId", authMiddleware, validate(deleteNotificationSchema), deleteNotification);

export default router;
