"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getCommentById = exports.getCommentsByTask = exports.createComment = void 0;
const comments_model_1 = require("../models/comments.model");
const users_model_1 = require("../models/users.model");
const createComment = async (data) => {
    return await comments_model_1.Comments.create(data);
};
exports.createComment = createComment;
const getCommentsByTask = async (taskId, { page, limit }) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await comments_model_1.Comments.findAndCountAll({
        where: { taskId },
        include: [{ model: users_model_1.User, as: "author", attributes: ["id", "username", "email", "gravatarUrl"] }],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });
    return { total: count, totalPages: Math.ceil(count / limit), page, limit, comments: rows };
};
exports.getCommentsByTask = getCommentsByTask;
const getCommentById = async (commentId) => {
    return await comments_model_1.Comments.findByPk(commentId);
};
exports.getCommentById = getCommentById;
const updateComment = async (commentId, data) => {
    return await comments_model_1.Comments.update(data, { where: { id: commentId } });
};
exports.updateComment = updateComment;
const deleteComment = async (commentId) => {
    return await comments_model_1.Comments.destroy({ where: { id: commentId } });
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=comments.repository.js.map