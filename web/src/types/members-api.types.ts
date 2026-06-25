export interface OrgMemberUser {
  id: string;
  username: string;
  email: string;
  gravatarUrl: string;
}

export interface OrgMember {
  userRoleInOrg: string;
  createdAt: string;
  User: OrgMemberUser;
}

export interface GetOrgMembersResponse {
  success: boolean;
  message: string;
  data: OrgMember[];
}

export interface RemoveOrgMemberResponse {
  success: boolean;
  message: string;
  data: null;
}
