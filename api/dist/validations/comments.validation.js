"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentSchema = exports.updateCommentSchema = exports.getCommentsByTaskSchema = exports.createCommentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const commentParams = zod_1.default.object({
    orgId: zod_1.default.uuidv4("Invalid organization ID"),
    projectId: zod_1.default.uuidv4("Invalid project ID"),
    taskId: zod_1.default.uuidv4("Invalid task ID"),
});
exports.createCommentSchema = zod_1.default.object({
    params: commentParams,
    body: zod_1.default.object({
        content: zod_1.default.string().min(1, "Content is required").max(115, "Comment cannot exceed 115 characters"),
    }),
});
exports.getCommentsByTaskSchema = zod_1.default.object({
    params: commentParams,
    query: zod_1.default.object({
        page: zod_1.default.coerce.number().int().min(1).default(1),
        limit: zod_1.default.coerce.number().int().min(1).max(100).default(20),
    }),
});
exports.updateCommentSchema = zod_1.default.object({
    params: commentParams.extend({
        commentId: zod_1.default.uuidv4("Invalid comment ID"),
    }),
    body: zod_1.default.object({
        content: zod_1.default.string().min(1, "Content is required").max(115, "Comment cannot exceed 115 characters"),
    }),
});
exports.deleteCommentSchema = zod_1.default.object({
    params: commentParams.extend({
        commentId: zod_1.default.uuidv4("Invalid comment ID"),
    }),
});
//# sourceMappingURL=comments.validation.js.map