import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { createTaskSchema, getTaskByIdSchema, getTasksAssignedToUserInProjectSchema, getTasksSchema } from "../validations/tasks.validation";
import { createTask, getTaskById, getTasksAssignedToUserInProject, getTasksInProject } from "../controllers/tasks.controller";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, validate(getTasksSchema), getTasksInProject);
router.post("/", authMiddleware, validate(createTaskSchema), createTask);
router.get("/my-tasks", authMiddleware, validate(getTasksAssignedToUserInProjectSchema), getTasksAssignedToUserInProject);
router.get("/:taskId", authMiddleware, validate(getTaskByIdSchema), getTaskById);

export default router;
