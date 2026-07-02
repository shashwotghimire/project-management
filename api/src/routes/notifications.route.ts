import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { getUserNotificationsSchema } from "../validations/notifications.validation";
import { getUserNotifications } from "../controllers/notifications.controller";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, validate(getUserNotificationsSchema), getUserNotifications);

export default router;
