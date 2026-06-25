import api from "@/lib/axios";
import {
  Comment,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  GetTaskCommentsResponse,
  PaginatedComments,
  UpdateCommentRequest,
  UpdateCommentResponse,
} from "@/types/comment-api.types";

export const getTaskCommentsService = async (
  orgId: string,
  projectId: string,
  taskId: string,
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedComments> => {
  const response = await api.get<GetTaskCommentsResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}/comments`,
    { params: { page, limit } },
  );
  return response.data.data;
};

export const createCommentService = async ({
  orgId,
  projectId,
  taskId,
  content,
}: CreateCommentRequest): Promise<Comment> => {
  const response = await api.post<CreateCommentResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}/comments`,
    { content },
  );
  return response.data.data;
};

export const updateCommentService = async ({
  orgId,
  projectId,
  taskId,
  commentId,
  content,
}: UpdateCommentRequest): Promise<Comment> => {
  const response = await api.patch<UpdateCommentResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
    { content },
  );
  return response.data.data;
};

export const deleteCommentService = async ({
  orgId,
  projectId,
  taskId,
  commentId,
}: DeleteCommentRequest): Promise<void> => {
  await api.delete<DeleteCommentResponse>(
    `/organizations/${orgId}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
  );
};
