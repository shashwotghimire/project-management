"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = exports.reassignTaskSchema = exports.updateTaskPositionSchema = exports.updateTaskStatusSchema = exports.updateTaskSchema = exports.deleteTaskSchema = exports.getTaskByIdSchema = exports.getTasksAssignedToUserInProjectSchema = exports.getTasksAssignedToUserSchema = exports.getTasksSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.getTasksSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
    }),
    query: zod_1.default.object({
        page: zod_1.default.coerce.number().int().positive().optional().default(1),
        limit: zod_1.default.coerce.number().int().positive().max(100).optional().default(20),
    }),
});
exports.getTasksAssignedToUserSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
    }),
});
exports.getTasksAssignedToUserInProjectSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
    }),
});
exports.getTaskByIdSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
        taskId: zod_1.default.uuidv4("Invalid task ID"),
    }),
});
exports.deleteTaskSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
        taskId: zod_1.default.uuidv4("Invalid task ID"),
    }),
});
exports.updateTaskSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
        taskId: zod_1.default.uuidv4("Invalid task ID"),
    }),
    body: zod_1.default.object({
        title: zod_1.default.string().min(1).optional(),
        description: zod_1.default.string().optional(),
        status: zod_1.default.enum(["todo", "in_progress", "completed"]).optional(),
        priority: zod_1.default.enum(["low", "medium", "high"]).optional(),
        dueDate: zod_1.default.iso.date("Invalid date format").optional(),
    }).refine((b) => Object.values(b).some((v) => v !== undefined), { message: "At least one field must be provided" }),
});
exports.updateTaskStatusSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
        taskId: zod_1.default.uuidv4("Invalid task ID"),
    }),
    body: zod_1.default.object({
        status: zod_1.default.enum(["todo", "in_progress", "completed"]),
        position: zod_1.default.number().int().nonnegative(),
    }),
});
exports.updateTaskPositionSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
        taskId: zod_1.default.uuidv4("Invalid task ID"),
    }),
    body: zod_1.default.object({
        position: zod_1.default.number().int().nonnegative(),
    }),
});
exports.reassignTaskSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
        taskId: zod_1.default.uuidv4("Invalid task ID"),
    }),
    body: zod_1.default.object({
        newUserId: zod_1.default.uuidv4("Invalid user ID"),
    }),
});
exports.createTaskSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        projectId: zod_1.default.uuidv4("Invalid project ID"),
    }),
    body: zod_1.default.object({
        title: zod_1.default.string().min(1, "Title is required"),
        description: zod_1.default.string().optional(),
        assignedTo: zod_1.default.uuidv4("Invalid user ID"),
        status: zod_1.default.enum(["todo", "in_progress", "completed"]).optional(),
        priority: zod_1.default.enum(["low", "medium", "high"]).optional(),
        dueDate: zod_1.default.iso.date("Invalid date format").optional(),
    }),
});
//# sourceMappingURL=tasks.validation.js.map