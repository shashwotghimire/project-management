import z from "zod";
export declare const createCommentSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        content: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getCommentsByTaskSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCommentSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
        commentId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        content: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteCommentSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        projectId: z.ZodUUID;
        taskId: z.ZodUUID;
        commentId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=comments.validation.d.ts.map