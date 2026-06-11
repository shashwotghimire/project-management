import { Op } from "sequelize";
import { sequelize } from "../configs/db.config";
import { OrganizationsMember } from "../models/organizations-members.model";
import { Organization } from "../models/organizations.model";
import { User } from "../models/users.model";

export const createOrganization = ({
  name,
  adminId,
}: {
  name: string;
  adminId: string;
}) => {
  return sequelize.transaction(async (t) => {
    const org = await Organization.create(
      {
        name,
        adminId,
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
