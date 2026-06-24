"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassignTaskToAnotherUser = exports.updateTaskPosition = exports.updateTaskStatus = exports.updateTask = exports.deleteTask = exports.getTasksAssignedToUserInProject = exports.getTaskById = exports.getTasksInProject = exports.createTask = exports.getTasksAssignedToUser = void 0;
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const tasks_service_1 = require("../services/tasks.service");
const ApiResponse_1 = require("../helpers/ApiResponse");
const check_string_helper_1 = require("../helpers/check-string.helper");
exports.getTasksAssignedToUser = (0, asyncHandler_1.default)(async (req, res) => {
    const orgId = (0, check_string_helper_1.isString)(req.params.orgId);
    const userId = req.user.id;
    const tasks = await (0, tasks_service_1.getTasksAssignedToUserService)({ userId, orgId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Tasks fetched successfully", tasks));
});
exports.createTask = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const createdBy = req.user.id;
    const { title, description, assignedTo, status, priority, dueDate } = req.body;
    const task = await (0, tasks_service_1.createTaskService)({
        title,
        description,
        assignedTo,
        assignedBy: createdBy,
        createdBy,
        projectId,
        status,
        priority,
        dueDate,
    });
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(true, "Task created successfully", task));
});
exports.getTasksInProject = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const tasks = await (0, tasks_service_1.getTasksInProjectService)({ projectId, userId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Tasks fetched successfully", tasks));
});
exports.getTaskById = (0, asyncHandler_1.default)(async (req, res) => {
    const taskId = (0, check_string_helper_1.isString)(req.params.taskId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const task = await (0, tasks_service_1.getTaskByIdService)({ taskId, userId, projectId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Task fetched successfully", task));
});
exports.getTasksAssignedToUserInProject = (0, asyncHandler_1.default)(async (req, res) => {
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const tasks = await (0, tasks_service_1.getTasksAssignedToUserInProjectService)({
        userId,
        projectId,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Tasks fetched successfully", tasks));
});
exports.deleteTask = (0, asyncHandler_1.default)(async (req, res) => {
    const taskId = (0, check_string_helper_1.isString)(req.params.taskId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    await (0, tasks_service_1.deleteTaskService)({ taskId, projectId, userId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Task deleted successfully", null));
});
exports.updateTask = (0, asyncHandler_1.default)(async (req, res) => {
    const taskId = (0, check_string_helper_1.isString)(req.params.taskId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const { title, description, status, priority, dueDate } = req.body;
    const task = await (0, tasks_service_1.updateTaskService)({
        taskId,
        projectId,
        userId,
        data: { title, description, status, priority, dueDate },
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Task updated successfully", task));
});
exports.updateTaskStatus = (0, asyncHandler_1.default)(async (req, res) => {
    const taskId = (0, check_string_helper_1.isString)(req.params.taskId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const { status } = req.body;
    await (0, tasks_service_1.updateTaskStatusService)({ taskId, projectId, userId, status });
    return res.status(200).json(new ApiResponse_1.ApiResponse(true, "Task status updated successfully", null));
});
exports.updateTaskPosition = (0, asyncHandler_1.default)(async (req, res) => {
    const taskId = (0, check_string_helper_1.isString)(req.params.taskId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const { position } = req.body;
    await (0, tasks_service_1.updateTaskPositionService)({ taskId, projectId, userId, position });
    return res.status(200).json(new ApiResponse_1.ApiResponse(true, "Task position updated successfully", null));
});
exports.reassignTaskToAnotherUser = (0, asyncHandler_1.default)(async (req, res) => {
    const taskId = (0, check_string_helper_1.isString)(req.params.taskId);
    const newUserId = (0, check_string_helper_1.isString)(req.body.newUserId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    await (0, tasks_service_1.reassignTaskToAnotherUserService)({
        taskId,
        newUserId,
        userId,
        projectId,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Task reassigned successfully", null));
});
//# sourceMappingURL=tasks.controller.js.map