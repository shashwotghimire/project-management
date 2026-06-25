export declare const createCommentService: (data: {
    content: string;
    taskId: string;
    projectId: string;
    organizationId: string;
    authorId: string;
}) => Promise<import("../models/comments.model").Comments>;
export declare const getCommentsByTaskService: ({ taskId, projectId, userId, page, limit, }: {
    taskId: string;
    projectId: string;
    userId: string;
    page: number;
    limit: number;
}) => Promise<{
    total: number;
    totalPages: number;
    page: number;
    limit: number;
    comments: import("../models/comments.model").Comments[];
}>;
export declare const updateCommentService: ({ commentId, userId, content, }: {
    commentId: string;
    userId: string;
    content: string;
}) => Promise<[affectedCount: number]>;
export declare const deleteCommentService: ({ commentId, userId, projectId, organizationId, }: {
    commentId: string;
    userId: string;
    projectId: string;
    organizationId: string;
}) => Promise<number>;
//# sourceMappingURL=comments.service.d.ts.map