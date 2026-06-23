import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskByIdSchema,
  getTasksAssignedToUserInProjectSchema,
  getTasksSchema,
  reassignTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  updateTaskPositionSchema,
} from "../validations/tasks.validation";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksAssignedToUserInProject,
  getTasksInProject,
  reassignTaskToAnotherUser,
  updateTask,
  updateTaskStatus,
  updateTaskPosition,
} from "../controllers/tasks.controller";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, validate(getTasksSchema), getTasksInProject);
router.post("/", authMiddleware, validate(createTaskSchema), createTask);
router.get(
  "/my-tasks",
  authMiddleware,
  validate(getTasksAssignedToUserInProjectSchema),
  getTasksAssignedToUserInProject,
);
router.get(
  "/:taskId",
  authMiddleware,
  validate(getTaskByIdSchema),
  getTaskById,
);
router.patch(
  "/:taskId",
  authMiddleware,
  validate(updateTaskSchema),
  updateTask,
);
router.delete(
  "/:taskId",
  authMiddleware,
  validate(deleteTaskSchema),
  deleteTask,
);
router.patch(
  "/:taskId/status",
  authMiddleware,
  validate(updateTaskStatusSchema),
  updateTaskStatus,
);
router.patch(
  "/:taskId/position",
  authMiddleware,
  validate(updateTaskPositionSchema),
  updateTaskPosition,
);
router.patch(
  "/:taskId/reassign",
  authMiddleware,
  validate(reassignTaskSchema),
  reassignTaskToAnotherUser,
);

export default router;
