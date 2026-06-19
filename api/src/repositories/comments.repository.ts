import { Comments } from "../models/comments.model";

export const createComment = async (data: {
  content: string;
  taskId: string;
  projectId: string;
  organizationId: string;
  authorId: string;
}) => {
  return await Comments.create(data);
};

export const getCommentsByTask = async (taskId: string) => {
  return await Comments.findAll({ where: { taskId } });
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
