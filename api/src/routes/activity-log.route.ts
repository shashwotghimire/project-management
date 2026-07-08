import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { getOrgActivityLogsSchema } from "../validations/activity-log.validation";
import { getOrgActivityLogs } from "../controllers/activity-log.controller";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, validate(getOrgActivityLogsSchema), getOrgActivityLogs);

export default router;
