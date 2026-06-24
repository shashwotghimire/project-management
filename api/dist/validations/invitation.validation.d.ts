import z from "zod";
export declare const createInvitationSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodEmail;
        organizationId: z.ZodUUID;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const respondToInvitationSchema: z.ZodObject<{
    query: z.ZodObject<{
        token: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        response: z.ZodEnum<{
            accepted: "accepted";
            declined: "declined";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=invitation.validation.d.ts.map