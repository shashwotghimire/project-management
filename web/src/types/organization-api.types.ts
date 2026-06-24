export type OrgMemberRole = "member" | "org admin";

export interface Organization {
  id: string;
  name: string;
  adminId: string;
  blocked: boolean;
  logoUrl: string | null;
  description: string | null;
  websiteUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMember {
  userId: string;
  userRoleInOrg: OrgMemberRole;
  Organization: Organization;
  User: {
    username: string;
    email: string;
  };
}

export interface OrgAdmin {
  id: string;
  userId: string;
  orgId: string;
  userRoleInOrg: OrgMemberRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationResponse {
  success: boolean;
  message: string;
  data: {
    org: Organization;
    admin: OrgAdmin;
  };
}

export interface GetUsersOrganizationsResponse {
  success: boolean;
  message: string;
  data: {
    organizations: OrganizationMember[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface OrganizationByIdResponse {
  success: boolean;
  message: string;
  data: Organization;
}

export interface OrgMember {
  userRoleInOrg: OrgMemberRole;
  User: {
    id: string;
    username: string;
    email: string;
  };
}

export interface GetOrgMembersResponse {
  success: boolean;
  message: string;
  data: OrgMember[];
}
