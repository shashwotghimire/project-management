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

export interface UpdateOrganizationRequest {
  name?: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
}

export interface UpdateOrganizationResponse {
  success: boolean;
  message: string;
  data: Organization;
}

export interface DeleteOrganizationResponse {
  success: boolean;
  message: string;
  data: null;
}

export type OrgActivityAction =
  | "org_updated"
  | "member_joined"
  | "member_removed"
  | "project_created"
  | "project_deleted"
  | "member_added_to_project"
  | "member_removed_from_project"
  | "invitation_sent"
  | "invitation_accepted";

export interface OrgActivityLogActor {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
}

export interface OrgActivityLog {
  id: string;
  orgId: string;
  actorId: string;
  action: OrgActivityAction;
  targetUserId: string | null;
  projectId: string | null;
  meta: Record<string, unknown> | null;
  createdAt: string;
  actor: OrgActivityLogActor;
  targetUser: OrgActivityLogActor | null;
  project: { id: string; name: string } | null;
}

export interface GetOrgActivityLogsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    page: number;
    limit: number;
    logs: OrgActivityLog[];
  };
}
