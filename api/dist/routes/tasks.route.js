"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const tasks_validation_1 = require("../validations/tasks.validation");
const tasks_controller_1 = require("../controllers/tasks.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.get("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.getTasksSchema), tasks_controller_1.getTasksInProject);
router.post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.createTaskSchema), tasks_controller_1.createTask);
router.get("/my-tasks", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.getTasksAssignedToUserInProjectSchema), tasks_controller_1.getTasksAssignedToUserInProject);
router.get("/:taskId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.getTaskByIdSchema), tasks_controller_1.getTaskById);
router.patch("/:taskId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.updateTaskSchema), tasks_controller_1.updateTask);
router.delete("/:taskId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.deleteTaskSchema), tasks_controller_1.deleteTask);
router.patch("/:taskId/status", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.updateTaskStatusSchema), tasks_controller_1.updateTaskStatus);
router.patch("/:taskId/position", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.updateTaskPositionSchema), tasks_controller_1.updateTaskPosition);
router.patch("/:taskId/reassign", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.reassignTaskSchema), tasks_controller_1.reassignTaskToAnotherUser);
exports.default = router;
//# sourceMappingURL=tasks.route.js.map