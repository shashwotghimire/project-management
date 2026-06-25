import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCommentService,
  deleteCommentService,
  getTaskCommentsService,
  updateCommentService,
} from "@/services/comments.service";

export const useGetTaskComments = (
  orgId: string,
  projectId: string,
  taskId: string,
  page: number = 1,
  limit: number = 20,
) => {
  return useQuery({
    queryKey: ["comments", orgId, projectId, taskId, page, limit],
    queryFn: () => getTaskCommentsService(orgId, projectId, taskId, page, limit),
  });
};

export const useCreateComment = (
  orgId: string,
  projectId: string,
  taskId: string,
  page: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) =>
      createCommentService({ orgId, projectId, taskId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", orgId, projectId, taskId],
      });
    },
  });
};

export const useUpdateComment = (
  orgId: string,
  projectId: string,
  taskId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      updateCommentService({ orgId, projectId, taskId, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", orgId, projectId, taskId],
      });
    },
  });
};

export const useDeleteComment = (
  orgId: string,
  projectId: string,
  taskId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) =>
      deleteCommentService({ orgId, projectId, taskId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", orgId, projectId, taskId],
      });
    },
  });
};
