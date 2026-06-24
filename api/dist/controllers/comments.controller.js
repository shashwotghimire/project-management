"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getCommentsByTask = exports.createComment = void 0;
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const ApiResponse_1 = require("../helpers/ApiResponse");
const check_string_helper_1 = require("../helpers/check-string.helper");
const comments_service_1 = require("../services/comments.service");
exports.createComment = (0, asyncHandler_1.default)(async (req, res) => {
    const taskId = (0, check_string_helper_1.isString)(req.params.taskId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const orgId = (0, check_string_helper_1.isString)(req.params.orgId);
    const authorId = req.user.id;
    const { content } = req.body;
    const comment = await (0, comments_service_1.createCommentService)({
        content,
        taskId,
        projectId,
        organizationId: orgId,
        authorId,
    });
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(true, "Comment created successfully", comment));
});
exports.getCommentsByTask = (0, asyncHandler_1.default)(async (req, res) => {
    const taskId = (0, check_string_helper_1.isString)(req.params.taskId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const userId = req.user.id;
    const comments = await (0, comments_service_1.getCommentsByTaskService)({
        taskId,
        projectId,
        userId,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Comments fetched successfully", comments));
});
exports.updateComment = (0, asyncHandler_1.default)(async (req, res) => {
    const commentId = (0, check_string_helper_1.isString)(req.params.commentId);
    const userId = req.user.id;
    const { content } = req.body;
    const comment = await (0, comments_service_1.updateCommentService)({ commentId, userId, content });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Comment updated successfully", comment));
});
exports.deleteComment = (0, asyncHandler_1.default)(async (req, res) => {
    const commentId = (0, check_string_helper_1.isString)(req.params.commentId);
    const projectId = (0, check_string_helper_1.isString)(req.params.projectId);
    const orgId = (0, check_string_helper_1.isString)(req.params.orgId);
    const userId = req.user.id;
    await (0, comments_service_1.deleteCommentService)({
        commentId,
        userId,
        projectId,
        organizationId: orgId,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Comment deleted successfully", null));
});
//# sourceMappingURL=comments.controller.js.map