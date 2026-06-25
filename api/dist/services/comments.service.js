"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentService = exports.updateCommentService = exports.getCommentsByTaskService = exports.createCommentService = void 0;
const ApiError_1 = require("../helpers/ApiError");
const organizations_repository_1 = require("../repositories/organizations.repository");
const projects_repository_1 = require("../repositories/projects.repository");
const tasks_repository_1 = require("../repositories/tasks.repository");
const comments_repository_1 = require("../repositories/comments.repository");
const createCommentService = async (data) => {
    const task = await (0, tasks_repository_1.getTaskById)(data.taskId);
    if (!task) {
        throw new ApiError_1.ApiError(404, "Task with the given ID does not exist.", "Task not found");
    }
    if (task.projectId !== data.projectId) {
        throw new ApiError_1.ApiError(400, "Task does not belong to the given project.", "Task/project mismatch");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(data.authorId, data.projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only project members can comment on tasks.");
    }
    return await (0, comments_repository_1.createComment)(data);
};
exports.createCommentService = createCommentService;
const getCommentsByTaskService = async ({ taskId, projectId, userId, page, limit, }) => {
    const task = await (0, tasks_repository_1.getTaskById)(taskId);
    if (!task) {
        throw new ApiError_1.ApiError(404, "Task with the given ID does not exist.", "Task not found");
    }
    if (task.projectId !== projectId) {
        throw new ApiError_1.ApiError(400, "Task does not belong to the given project.", "Task/project mismatch");
    }
    const isMember = await (0, projects_repository_1.isUserMemberOfProject)(userId, projectId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only project members can view comments.");
    }
    return await (0, comments_repository_1.getCommentsByTask)(taskId, { page, limit });
};
exports.getCommentsByTaskService = getCommentsByTaskService;
const updateCommentService = async ({ commentId, userId, content, }) => {
    const comment = await (0, comments_repository_1.getCommentById)(commentId);
    if (!comment) {
        throw new ApiError_1.ApiError(404, "Comment with the given ID does not exist.", "Comment not found");
    }
    if (comment.authorId !== userId) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only the comment author can edit this comment.");
    }
    return await (0, comments_repository_1.updateComment)(commentId, { content });
};
exports.updateCommentService = updateCommentService;
const deleteCommentService = async ({ commentId, userId, projectId, organizationId, }) => {
    const comment = await (0, comments_repository_1.getCommentById)(commentId);
    if (!comment) {
        throw new ApiError_1.ApiError(404, "Comment with the given ID does not exist.", "Comment not found");
    }
    const isAuthor = comment.authorId === userId;
    const isOrgAdmin = await (0, organizations_repository_1.getOrgByAdminId)(userId, organizationId);
    if (!isAuthor && !isOrgAdmin) {
        throw new ApiError_1.ApiError(403, "Forbidden", "Only the comment author or an org admin can delete this comment.");
    }
    return await (0, comments_repository_1.deleteComment)(commentId);
};
exports.deleteCommentService = deleteCommentService;
//# sourceMappingURL=comments.service.js.map