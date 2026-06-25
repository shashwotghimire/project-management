export declare const createOrganizationService: ({ name, adminId, logoUrl, description, websiteUrl, }: {
    name: string;
    adminId: string;
    logoUrl?: string;
    description?: string;
    websiteUrl?: string;
}) => Promise<{
    org: import("../models/organizations.model").Organization;
    admin: import("../models/organizations-members.model").OrganizationsMember;
}>;
export declare const getUsersOrganizationsService: ({ userId, page, limit, query, }: {
    userId: string;
    page: number;
    limit: number;
    query?: string;
}) => Promise<{
    organizations: import("../models/organizations-members.model").OrganizationsMember[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}>;
export declare const updateOrganizationService: ({ orgId, adminId, name, logoUrl, description, websiteUrl, }: {
    orgId: string;
    adminId: string;
    name?: string | undefined;
    logoUrl?: string | undefined;
    description?: string | undefined;
    websiteUrl?: string | undefined;
}) => Promise<import("../models/organizations.model").Organization | null>;
export declare const deleteOrganizationService: ({ orgId, adminId, }: {
    orgId: string;
    adminId: string;
}) => Promise<void>;
export declare const getOrgByIdService: (orgId: string, userId: string) => Promise<import("../models/organizations.model").Organization>;
export declare const removeOrgMemberService: ({ orgId, targetUserId, requesterId, }: {
    orgId: string;
    targetUserId: string;
    requesterId: string;
}) => Promise<void>;
export declare const getAllMembersOfOrgService: (orgId: string, userId: string) => Promise<import("../models/organizations-members.model").OrganizationsMember[]>;
//# sourceMappingURL=organizations.service.d.ts.map