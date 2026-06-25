export interface CommentAuthor {
  id: string;
  username: string;
  email: string;
  gravatarUrl: string | null;
}

export interface Comment {
  id: string;
  content: string;
  taskId: string;
  projectId: string;
  organizationId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
}

export interface PaginatedComments {
  comments: Comment[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface GetTaskCommentsResponse {
  success: boolean;
  message: string;
  data: PaginatedComments;
}

export interface CreateCommentRequest {
  orgId: string;
  projectId: string;
  taskId: string;
  content: string;
}

export interface CreateCommentResponse {
  success: boolean;
  message: string;
  data: Comment;
}

export interface UpdateCommentRequest {
  orgId: string;
  projectId: string;
  taskId: string;
  commentId: string;
  content: string;
}

export interface UpdateCommentResponse {
  success: boolean;
  message: string;
  data: Comment;
}

export interface DeleteCommentRequest {
  orgId: string;
  projectId: string;
  taskId: string;
  commentId: string;
}

export interface DeleteCommentResponse {
  success: boolean;
  message: string;
  data: null;
}
