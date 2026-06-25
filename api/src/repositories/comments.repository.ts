import { Comments } from "../models/comments.model";
import { User } from "../models/users.model";

export const createComment = async (data: {
  content: string;
  taskId: string;
  projectId: string;
  organizationId: string;
  authorId: string;
}) => {
  return await Comments.create(data);
};

export const getCommentsByTask = async (
  taskId: string,
  { page, limit }: { page: number; limit: number },
) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Comments.findAndCountAll({
    where: { taskId },
    include: [{ model: User, as: "author", attributes: ["id", "username", "email", "gravatarUrl"] }],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return { total: count, totalPages: Math.ceil(count / limit), page, limit, comments: rows };
};

export const getCommentById = async (commentId: string) => {
  return await Comments.findByPk(commentId);
};

export const updateComment = async (
  commentId: string,
  data: { content: string },
) => {
  return await Comments.update(data, { where: { id: commentId } });
};

export const deleteComment = async (commentId: string) => {
  return await Comments.destroy({ where: { id: commentId } });
};
