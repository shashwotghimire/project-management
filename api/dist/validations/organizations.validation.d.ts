import z from "zod";
export declare const createOrganizationSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getUsersOrganizationsSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
        limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
        query: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateOrganizationSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
    }, z.core.$strip>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        logoUrl: z.ZodOptional<z.ZodURL>;
        description: z.ZodOptional<z.ZodString>;
        websiteUrl: z.ZodOptional<z.ZodURL>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const deleteOrganizationSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getOrgByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getAllMembersOfOrgSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const removeOrgMemberSchema: z.ZodObject<{
    params: z.ZodObject<{
        orgId: z.ZodUUID;
        userId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=organizations.validation.d.ts.map