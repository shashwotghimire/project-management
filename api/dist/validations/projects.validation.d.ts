import z from "zod";
export declare const createProjectSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        name: z.ZodString;
        logoUrl: z.ZodOptional<z.ZodURL>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteProjectSchema: z.ZodObject<{
    params: z.ZodObject<{
        projectId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateProjectSchema: z.ZodObject<{
    params: z.ZodObject<{
        projectId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        logoUrl: z.ZodOptional<z.ZodURL>;
        status: z.ZodOptional<z.ZodEnum<{
            active: "active";
            archived: "archived";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getUserProjectsSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
    }, z.core.$strip>;
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        search: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getProjectByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        projectId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getProjectMembersSchema: z.ZodObject<{
    params: z.ZodObject<{
        projectId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const addMemberToProjectSchema: z.ZodObject<{
    params: z.ZodObject<{
        projectId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        userId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=projects.validation.d.ts.map