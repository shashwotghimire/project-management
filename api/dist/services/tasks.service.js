"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassignTaskToAnotherUserService = exports.updateTaskPositionService = exports.updateTaskStatusService = exports.getTasksAssignedToUserInProjectService = exports.updateTaskService = exports.deleteTaskService = exports.getTasksAssignedToUserService = exports.getTaskByIdService = exports.getTasksInProjectService = exports.createTaskService = void 0;
const ApiError_1 = require("../helpers/ApiError");
const organizations_repository_1 = require("../repositories/organizations.repository");
const projects_repository_1 = require("../repositories/projects.repository");
const tasks_repository_1 = require("../repositories/tasks.repository");
const createTaskService = async (data) => {
    const project = await (0, projects_repository_1.getProjectById)(data.projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(data.assignedTo, data.projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(400, "The user you are trying to assign the task to is not a member of the project.", "User not a member of project");
    }
    const creatorIsMember = await (0, projects_repository_1.isUserMemberOfProject)(data.createdBy, data.projectId);
    if (!creatorIsMember) {
        throw new ApiError_1.ApiError(400, "The user you are trying to create the task is not a member of the project.", "User not a member of project");
    }
    const isCreatorOrgAdmin = await (0, organizations_repository_1.getOrgByAdminId)(data.createdBy, project.organizationId);
    if (!isCreatorOrgAdmin) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members who are admins can create tasks.");
    }
    return await (0, tasks_repository_1.createTask)(data);
};
exports.createTaskService = createTaskService;
const getTasksInProjectService = async ({ projectId, userId, page, limit, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the project can view the tasks.");
    }
    return await (0, tasks_repository_1.getTasksInProject)(projectId, page, limit);
};
exports.getTasksInProjectService = getTasksInProjectService;
const getTaskByIdService = async ({ userId, taskId, projectId, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the project can view the tasks.");
    }
    const task = await (0, tasks_repository_1.getTaskById)(taskId);
    if (!task) {
        throw new ApiError_1.ApiError(404, "Task with the given ID does not exist.", "Task not found");
    }
    const assignedTaskUserDetails = await (0, tasks_repository_1.getAssignedToTaskUserDetails)({
        projectId: task.projectId,
        taskId: task.id,
        userId: task.assignedTo,
    });
    return { task, assignedTaskUserDetails };
};
exports.getTaskByIdService = getTaskByIdService;
const getTasksAssignedToUserService = async ({ userId, orgId, }) => {
    const isUserMemberOfOrg = await (0, organizations_repository_1.userMemberOfOrg)(userId, orgId);
    if (!isUserMemberOfOrg) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the organization can view the tasks assigned to them.");
    }
    return await (0, tasks_repository_1.getTasksAssignedToUser)(userId);
};
exports.getTasksAssignedToUserService = getTasksAssignedToUserService;
const deleteTaskService = async ({ taskId, projectId, userId, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the project can delete tasks.");
    }
    const isOrgAdmin = await (0, organizations_repository_1.getOrgByAdminId)(userId, project.organizationId);
    if (!isOrgAdmin) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only org admins can delete tasks.");
    }
    const task = await (0, tasks_repository_1.getTaskById)(taskId);
    if (!task) {
        throw new ApiError_1.ApiError(404, "Task with the given ID does not exist.", "Task not found");
    }
    return await (0, tasks_repository_1.deleteTask)(taskId);
};
exports.deleteTaskService = deleteTaskService;
const updateTaskService = async ({ taskId, projectId, userId, data, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the project can update tasks.");
    }
    const isOrgAdmin = await (0, organizations_repository_1.getOrgByAdminId)(userId, project.organizationId);
    if (!isOrgAdmin) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only org admins can update tasks.");
    }
    const task = await (0, tasks_repository_1.getTaskById)(taskId);
    if (!task) {
        throw new ApiError_1.ApiError(404, "Task with the given ID does not exist.", "Task not found");
    }
    return await (0, tasks_repository_1.updateTask)(taskId, data);
};
exports.updateTaskService = updateTaskService;
const getTasksAssignedToUserInProjectService = async ({ userId, projectId, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the project can view the tasks assigned to them.");
    }
    const tasks = await (0, tasks_repository_1.getTasksAssignedToUserInProject)(userId, projectId);
    return tasks;
};
exports.getTasksAssignedToUserInProjectService = getTasksAssignedToUserInProjectService;
const updateTaskStatusService = async ({ taskId, projectId, userId, status, position, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the project can update tasks.");
    }
    const task = await (0, tasks_repository_1.getTaskById)(taskId);
    if (!task) {
        throw new ApiError_1.ApiError(404, "Task with the given ID does not exist.", "Task not found");
    }
    return await (0, tasks_repository_1.updateTaskStatus)(taskId, status, position);
};
exports.updateTaskStatusService = updateTaskStatusService;
const updateTaskPositionService = async ({ taskId, projectId, userId, position, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the project can update tasks.");
    }
    const task = await (0, tasks_repository_1.getTaskById)(taskId);
    if (!task) {
        throw new ApiError_1.ApiError(404, "Task with the given ID does not exist.", "Task not found");
    }
    return await (0, tasks_repository_1.updateTaskPosition)(taskId, position);
};
exports.updateTaskPositionService = updateTaskPositionService;
const reassignTaskToAnotherUserService = async ({ taskId, newUserId, projectId, userId, }) => {
    const project = await (0, projects_repository_1.getProjectById)(projectId);
    if (!project) {
        throw new ApiError_1.ApiError(404, "Project with the given ID does not exist.", "Project not found");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members of the project can reassign tasks.");
    }
    const isMemberOrgAdmin = await (0, organizations_repository_1.getOrgByAdminId)(userId, project.organizationId);
    if (!isMemberOrgAdmin) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only members who are admins can reassign tasks.");
    }
    const task = await (0, tasks_repository_1.getTaskById)(taskId);
    if (!task) {
        throw new ApiError_1.ApiError(404, "Task with the given ID does not exist.", "Task not found");
    }
    const isNewUserMember = await (0, projects_repository_1.isUserMemberOfProject)(newUserId, projectId);
    if (!isNewUserMember) {
        throw new ApiError_1.ApiError(400, "The user you are trying to assign the task to is not a member of the project.", "User not a member of project");
    }
    return await (0, tasks_repository_1.reassignTaskToAnotherUser)({ taskId, newUserId });
};
exports.reassignTaskToAnotherUserService = reassignTaskToAnotherUserService;
//# sourceMappingURL=tasks.service.js.map