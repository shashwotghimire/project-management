import { Op } from "sequelize";
import { sequelize } from "../configs/db.config";
import { OrganizationsMember } from "../models/organizations-members.model";
import { Organization } from "../models/organizations.model";
import { User } from "../models/users.model";

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

export const getOrgByAdminId = (adminId: string, orgId: string) => {
  return Organization.findOne({ where: { id: orgId, adminId } });
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
  const membership = await OrganizationsMember.findOne({
    where: { userId, orgId },
  });
  return !!membership;
};
