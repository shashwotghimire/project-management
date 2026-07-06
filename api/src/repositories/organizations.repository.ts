import { Op } from "sequelize";
import { sequelize } from "../configs/db.config";
import { OrganizationsMember } from "../models/organizations-members.model";
import { Organization } from "../models/organizations.model";
import { User } from "../models/users.model";
import { Project } from "../models/projects.model";
import { Tasks } from "../models/tasks.model";
import { ApiError } from "../helpers/ApiError";

export const createOrganization = ({
  name,
  adminId,
  logoUrl,
  description,
  websiteUrl,
}: {
  name: string;
  adminId: string;
  logoUrl?: string;
  description?: string;
  websiteUrl?: string;
}) => {
  return sequelize.transaction(async (t) => {
    const org = await Organization.create(
      {
        name,
        adminId,
        logoUrl,
        description,
        websiteUrl,
      },
      { transaction: t },
    );
    const admin = await OrganizationsMember.create(
      {
        userId: adminId,
        orgId: org.id,
        userRoleInOrg: "org admin",
      },
      {
        transaction: t,
      },
    );
    return { org, admin };
  });
};

export const getUsersOrganizations = async ({
  userId,
  page,
  limit,
  query,
}: {
  userId: string;
  page: number;
  limit: number;
  query?: string;
}) => {
  let whereClause: any = {};
  if (query) {
    whereClause[Op.or] = [{ username: { [Op.iLike]: `%${query}%` } }];
  }
  const userOrgs = await OrganizationsMember.findAll({
    where: { userId },
    include: [
      {
        model: Organization,
        where: whereClause,
      },
      {
        model: User,
        attributes: ["username", "email"],
      },
    ],
    attributes: {
      exclude: ["id", "createdAt", "updatedAt", "orgId"],
    },

    limit,
    offset: (page - 1) * limit,
  });
  const total = await OrganizationsMember.count({
    where: { userId },
    include: {
      model: Organization,
      where: whereClause,
    },
  });
  return {
    organizations: userOrgs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const joinAnOrganization = ({
  userId,
  orgId,
}: {
  userId: string;
  orgId: string;
}) => {
  return OrganizationsMember.create({
    userId,
    orgId,
    userRoleInOrg: "member",
  });
};

export const getOrgById = (orgId: string) => {
  return Organization.findByPk(orgId);
};

export const getOrgByAdminId = async (adminId: string, orgId: string) => {
  const user = await User.findByPk(adminId);
  const isSuperadmin = user?.role === "superadmin";

  const org = await Organization.findOne({ where: { id: orgId, adminId } });
  if (org && org.blocked && !isSuperadmin) {
    throw new ApiError(
      403,
      "This organization has been suspended",
      "Organization suspended",
    );
  }
  return org;
};

export const updateOrganization = async ({
  orgId,
  name,
  logoUrl,
  description,
  websiteUrl,
  userId,
}: {
  orgId: string;
  name?: string | undefined;
  logoUrl?: string | undefined;
  description?: string | undefined;
  websiteUrl?: string | undefined;
  userId: string;
}) => {
  const org = await getOrgByAdminId(userId, orgId);
  if (!org) return null;
  if (name) org.name = name;
  if (logoUrl !== undefined) org.logoUrl = logoUrl;
  if (description !== undefined) org.description = description;
  if (websiteUrl !== undefined) org.websiteUrl = websiteUrl;
  await org.save();
  return org;
};

export const deleteOrganization = async (orgId: string, userId: string) => {
  const org = await getOrgByAdminId(userId, orgId);
  if (!org) {
    return null;
  }
  await org.destroy();
  return true;
};

export const userMemberOfOrg = async (userId: string, orgId: string) => {
  const user = await User.findByPk(userId);
  const isSuperadmin = user?.role === "superadmin";

  if (!isSuperadmin) {
    const org = await Organization.findByPk(orgId);
    if (org && org.blocked) {
      throw new ApiError(
        403,
        "This organization has been suspended",
        "Organization suspended",
      );
    }
  }

  const membership = await OrganizationsMember.findOne({
    where: { userId, orgId },
  });
  return !!membership;
};

export const removeOrgMember = async (
  userId: string,
  orgId: string,
): Promise<number> => {
  return OrganizationsMember.destroy({ where: { userId, orgId } });
};

export const getAllMembersOfOrg = async (orgId: string) => {
  return OrganizationsMember.findAll({
    where: { orgId },
    include: [
      {
        model: User,
        attributes: ["id", "username", "email", "gravatarUrl"],
      },
    ],
    attributes: {
      exclude: ["id", "updatedAt", "userId", "orgId"],
    },
  });
};

export const updateOrgLogo = async (orgId: string, adminId: string, logoUrl: string) => {
  const org = await getOrgByAdminId(adminId, orgId);
  if (!org) return null;
  org.logoUrl = logoUrl;
  await org.save();
  return org;
};

// Super Admin repository functions
export const getAllOrganizationsForAdmin = async ({
  page,
  limit,
  query,
}: {
  page: number;
  limit: number;
  query?: string;
}) => {
  const whereClause: any = {};
  if (query?.trim()) {
    whereClause.name = {
      [Op.iLike]: `%${query.trim()}%`,
    };
  }

  const { rows, count } = await Organization.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: User,
        as: "admin",
        attributes: ["id", "username", "email"],
      },
    ],
    limit,
    offset: (page - 1) * limit,
    order: [["createdAt", "DESC"]],
  });

  const orgs = await Promise.all(
    rows.map(async (org) => {
      const memberCount = await OrganizationsMember.count({
        where: { orgId: org.id },
      });
      const projectCount = await Project.count({
        where: { organizationId: org.id },
      });
      return {
        ...org.toJSON(),
        memberCount,
        projectCount,
      };
    }),
  );

  return {
    organizations: orgs,
    pagination: {
      page,
      limit,
      total: count,
      pages: Math.ceil(count / limit),
    },
  };
};

export const getOrganizationDetailsForAdmin = async (orgId: string) => {
  const org = await Organization.findByPk(orgId, {
    include: [
      {
        model: User,
        as: "admin",
        attributes: ["id", "username", "email"],
      },
    ],
  });
  if (!org) return null;

  const memberCount = await OrganizationsMember.count({
    where: { orgId: org.id },
  });
  const projectCount = await Project.count({
    where: { organizationId: org.id },
  });

  const members = await OrganizationsMember.findAll({
    where: { orgId },
    include: [
      {
        model: User,
        attributes: ["id", "username", "email", "role", "gravatarUrl"],
      },
    ],
  });

  return {
    ...org.toJSON(),
    memberCount,
    projectCount,
    members,
  };
};

export const setOrganizationBlockedStatus = async (
  orgId: string,
  blocked: boolean,
) => {
  const org = await Organization.findByPk(orgId);
  if (!org) return null;
  org.blocked = blocked;
  await org.save();
  return org;
};

export const getPlatformStats = async () => {
  const totalOrganizations = await Organization.count();
  const totalUsers = await User.count();
  const totalProjects = await Project.count();

  // Tasks breakdown by status
  const todoCount = await Tasks.count({ where: { status: "todo" } });
  const inProgressCount = await Tasks.count({
    where: { status: "in_progress" },
  });
  const completedCount = await Tasks.count({
    where: { status: "completed" },
  });
  const totalTasks = todoCount + inProgressCount + completedCount;

  // Organizations created in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const orgsLast30Days = await Organization.count({
    where: {
      createdAt: {
        [Op.gte]: thirtyDaysAgo,
      },
    } as any,
  });

  return {
    totalOrganizations,
    totalUsers,
    totalProjects,
    totalTasks,
    tasksStatus: {
      todo: todoCount,
      in_progress: inProgressCount,
      completed: completedCount,
    },
    orgsLast30Days,
  };
};
