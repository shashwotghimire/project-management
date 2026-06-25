import { Comments } from "../models/comments.model";
export declare const createComment: (data: {
    content: string;
    taskId: string;
    projectId: string;
    organizationId: string;
    authorId: string;
}) => Promise<Comments>;
export declare const getCommentsByTask: (taskId: string, { page, limit }: {
    page: number;
    limit: number;
}) => Promise<{
    total: number;
    totalPages: number;
    page: number;
    limit: number;
    comments: Comments[];
}>;
export declare const getCommentById: (commentId: string) => Promise<Comments | null>;
export declare const updateComment: (commentId: string, data: {
    content: string;
}) => Promise<[affectedCount: number]>;
export declare const deleteComment: (commentId: string) => Promise<number>;
//# sourceMappingURL=comments.repository.d.ts.map