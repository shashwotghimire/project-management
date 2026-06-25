import { OrganizationsMember } from "../models/organizations-members.model";
import { Organization } from "../models/organizations.model";
export declare const createOrganization: ({ name, adminId, logoUrl, description, websiteUrl, }: {
    name: string;
    adminId: string;
    logoUrl?: string;
    description?: string;
    websiteUrl?: string;
}) => Promise<{
    org: Organization;
    admin: OrganizationsMember;
}>;
export declare const getUsersOrganizations: ({ userId, page, limit, query, }: {
    userId: string;
    page: number;
    limit: number;
    query?: string;
}) => Promise<{
    organizations: OrganizationsMember[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}>;
export declare const joinAnOrganization: ({ userId, orgId, }: {
    userId: string;
    orgId: string;
}) => Promise<OrganizationsMember>;
export declare const getOrgById: (orgId: string) => Promise<Organization | null>;
export declare const getOrgByAdminId: (adminId: string, orgId: string) => Promise<Organization | null>;
export declare const updateOrganization: ({ orgId, name, logoUrl, description, websiteUrl, userId, }: {
    orgId: string;
    name?: string | undefined;
    logoUrl?: string | undefined;
    description?: string | undefined;
    websiteUrl?: string | undefined;
    userId: string;
}) => Promise<Organization | null>;
export declare const deleteOrganization: (orgId: string, userId: string) => Promise<true | null>;
export declare const userMemberOfOrg: (userId: string, orgId: string) => Promise<boolean>;
export declare const removeOrgMember: (userId: string, orgId: string) => Promise<number>;
export declare const getAllMembersOfOrg: (orgId: string) => Promise<OrganizationsMember[]>;
//# sourceMappingURL=organizations.repository.d.ts.map