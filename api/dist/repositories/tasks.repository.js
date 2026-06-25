"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignedToTaskUserDetails = exports.reassignTaskToAnotherUser = exports.updateTaskPosition = exports.updateTaskStatus = exports.deleteTask = exports.updateTask = exports.getTasksAssignedToUserInProject = exports.getTasksAssignedToUser = exports.getTaskById = exports.getTasksInProject = exports.createTask = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
const tasks_model_1 = require("../models/tasks.model");
const users_model_1 = require("../models/users.model");
const createTask = async (data) => {
    const count = await tasks_model_1.Tasks.count({
        where: { projectId: data.projectId, status: data.status ?? "todo" },
    });
    return await tasks_model_1.Tasks.create({
        title: data.title,
        description: data.description,
        projectId: data.projectId,
        priority: data.priority,
        status: data.status,
        createdBy: data.assignedBy,
        assignedBy: data.assignedBy,
        assignedTo: data.assignedTo,
        position: count,
        dueDate: data.dueDate,
    });
};
exports.createTask = createTask;
const getTasksInProject = async (projectId, page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    const { rows, count } = await tasks_model_1.Tasks.findAndCountAll({
        where: { projectId },
        limit,
        offset,
        order: [["position", "ASC"]],
    });
    return { tasks: rows, total: count, page, limit };
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
    await tasks_model_1.Tasks.update(data, { where: { id: taskId } });
    return await tasks_model_1.Tasks.findByPk(taskId);
};
exports.updateTask = updateTask;
const deleteTask = async (taskId) => {
    return await tasks_model_1.Tasks.destroy({ where: { id: taskId } });
};
exports.deleteTask = deleteTask;
const updateTaskStatus = async (taskId, status, position) => {
    const task = await tasks_model_1.Tasks.findByPk(taskId);
    const oldStatus = task?.status;
    const oldPosition = task?.position;
    await db_config_1.sequelize.transaction(async (t) => {
        await tasks_model_1.Tasks.decrement("position", {
            by: 1,
            where: {
                projectId: task?.projectId,
                status: oldStatus,
                position: { [sequelize_1.Op.gt]: oldPosition },
            },
            transaction: t,
        });
        await tasks_model_1.Tasks.increment("position", {
            by: 1,
            where: {
                projectId: task?.projectId,
                status,
                position: { [sequelize_1.Op.gt]: position },
            },
            transaction: t,
        });
        await task?.update({ position, status }, { transaction: t });
    });
};
exports.updateTaskStatus = updateTaskStatus;
const updateTaskPosition = async (taskId, position) => {
    const task = await tasks_model_1.Tasks.findByPk(taskId);
    const oldPosition = task?.position;
    await db_config_1.sequelize.transaction(async (t) => {
        if (position > oldPosition) {
            await tasks_model_1.Tasks.decrement("position", {
                by: 1,
                where: {
                    projectId: task?.projectId,
                    status: task?.status,
                    position: { [sequelize_1.Op.gt]: oldPosition, [sequelize_1.Op.lte]: position },
                },
                transaction: t,
            });
        }
        else {
            await tasks_model_1.Tasks.increment("position", {
                by: 1,
                where: {
                    projectId: task?.projectId,
                    status: task?.status,
                    position: { [sequelize_1.Op.lt]: oldPosition, [sequelize_1.Op.gte]: position },
                },
                transaction: t,
            });
        }
        await task?.update({ position }, { transaction: t });
    });
};
exports.updateTaskPosition = updateTaskPosition;
const reassignTaskToAnotherUser = async ({ taskId, newUserId, }) => {
    return await tasks_model_1.Tasks.update({ assignedTo: newUserId }, { where: { id: taskId } });
};
exports.reassignTaskToAnotherUser = reassignTaskToAnotherUser;
const getAssignedToTaskUserDetails = async ({ projectId, taskId, userId, }) => {
    const user = await tasks_model_1.Tasks.findOne({
        where: {
            id: taskId,
            projectId,
            assignedTo: userId,
        },
        attributes: [],
        include: {
            model: users_model_1.User,
            as: "assignee",
            // attributes: ["id", "username", "email", "gravatarUrl"],
        },
    });
    return user;
};
exports.getAssignedToTaskUserDetails = getAssignedToTaskUserDetails;
//# sourceMappingURL=tasks.repository.js.map