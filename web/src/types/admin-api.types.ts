export interface AdminOrganization {
  id: string;
  name: string;
  adminId: string;
  blocked: boolean;
  logoUrl: string | null;
  description: string | null;
  websiteUrl: string | null;
  createdAt: string;
  updatedAt: string;
  admin?: {
    id: string;
    username: string;
    email: string;
  };
  memberCount: number;
  projectCount: number;
}

export interface AdminOrganizationDetail extends AdminOrganization {
  members: {
    userId: string;
    userRoleInOrg: "member" | "org admin";
    User: {
      id: string;
      username: string;
      email: string;
      role: string;
      gravatarUrl: string | null;
    };
  }[];
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalOrganizations: number;
  totalUsers: number;
  totalProjects: number;
  totalTasks: number;
  tasksStatus: {
    todo: number;
    in_progress: number;
    completed: number;
  };
  orgsLast30Days: number;
}

export interface GetAdminOrganizationsResponse {
  success: boolean;
  message: string;
  data: {
    organizations: AdminOrganization[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface GetAdminOrganizationDetailResponse {
  success: boolean;
  message: string;
  data: AdminOrganizationDetail;
}

export interface GetAdminUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export interface GetAdminStatsResponse {
  success: boolean;
  message: string;
  data: AdminStats;
}
