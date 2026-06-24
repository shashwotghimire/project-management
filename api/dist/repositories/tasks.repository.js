"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassignTaskToAnotherUser = exports.updateTaskPosition = exports.updateTaskStatus = exports.deleteTask = exports.updateTask = exports.getTasksAssignedToUserInProject = exports.getTasksAssignedToUser = exports.getTaskById = exports.getTasksInProject = exports.createTask = void 0;
const tasks_model_1 = require("../models/tasks.model");
const createTask = async (data) => {
    return await tasks_model_1.Tasks.create({
        title: data.title,
        description: data.description,
        projectId: data.projectId,
        priority: data.priority,
        status: data.status,
        createdBy: data.assignedBy,
        assignedBy: data.assignedBy,
        assignedTo: data.assignedTo,
        position: data.position,
        dueDate: data.dueDate,
    });
};
exports.createTask = createTask;
const getTasksInProject = async (projectId) => {
    return await tasks_model_1.Tasks.findAll({ where: { projectId } });
};
exports.getTasksInProject = getTasksInProject;
const getTaskById = async (taskId) => {
    return await tasks_model_1.Tasks.findByPk(taskId);
};
exports.getTaskById = getTaskById;
const getTasksAssignedToUser = async (userId) => {
    return await tasks_model_1.Tasks.findAll({ where: { assignedTo: userId } });
};
exports.getTasksAssignedToUser = getTasksAssignedToUser;
const getTasksAssignedToUserInProject = async (userId, projectId) => {
    return await tasks_model_1.Tasks.findAll({ where: { assignedTo: userId, projectId } });
};
exports.getTasksAssignedToUserInProject = getTasksAssignedToUserInProject;
const updateTask = async (taskId, data) => {
    return await tasks_model_1.Tasks.update(data, { where: { id: taskId } });
};
exports.updateTask = updateTask;
const deleteTask = async (taskId) => {
    return await tasks_model_1.Tasks.destroy({ where: { id: taskId } });
};
exports.deleteTask = deleteTask;
const updateTaskStatus = async (taskId, status) => {
    return await tasks_model_1.Tasks.update({ status }, { where: { id: taskId } });
};
exports.updateTaskStatus = updateTaskStatus;
const updateTaskPosition = async (taskId, position) => {
    return await tasks_model_1.Tasks.update({ position }, { where: { id: taskId } });
};
exports.updateTaskPosition = updateTaskPosition;
const reassignTaskToAnotherUser = async ({ taskId, newUserId, }) => {
    return await tasks_model_1.Tasks.update({ assignedTo: newUserId }, { where: { id: taskId } });
};
exports.reassignTaskToAnotherUser = reassignTaskToAnotherUser;
//# sourceMappingURL=tasks.repository.js.map