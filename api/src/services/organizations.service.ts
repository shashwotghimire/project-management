import { ApiError } from "../helpers/ApiError";
import {
  createOrganization,
  deleteOrganization,
  getAllMembersOfOrg,
  getOrgByAdminId,
  getOrgById,
  getUsersOrganizations,
  removeOrgMember,
  updateOrganization,
  userMemberOfOrg,
} from "../repositories/organizations.repository";
import redis from "../configs/redis-client.config";
import { emailQueue } from "../queues/email.queue";
import { findUserById } from "../repositories/users.repository";
import { orgCreatedEmailTemplate } from "../utils/email-template.utils";

export const createOrganizationService = async ({
  name,
  adminId,
  logoUrl = "",
  description = "",
  websiteUrl = "",
}: {
  name: string;
  adminId: string;
  logoUrl?: string;
  description?: string;
  websiteUrl?: string;
}) => {
  const org = await createOrganization({
    name,
    adminId,
    logoUrl,
    description,
    websiteUrl,
  });

  const admin = await findUserById(adminId);
  if (admin) {
    await emailQueue.add("org-created", {
      to: admin.email,
      subject: `Your organization "${name}" has been created`,
      html: orgCreatedEmailTemplate(admin.username, name),
    });
  }

  return org;
};

export const getUsersOrganizationsService = async ({
  userId,
  page = 1,
  limit = 10,
  query = "",
}: {
  userId: string;
  page: number;
  limit: number;
  query?: string;
}) => {
  return await getUsersOrganizations({ userId, page, limit, query });
};

export const updateOrganizationService = async ({
  orgId,
  adminId,
  name,
  logoUrl,
  description,
  websiteUrl,
}: {
  orgId: string;
  adminId: string;
  name?: string | undefined;
  logoUrl?: string | undefined;
  description?: string | undefined;
  websiteUrl?: string | undefined;
}) => {
  const org = await getOrgByAdminId(adminId, orgId);
  if (!org) {
    throw new ApiError(
      404,
      "Organization not found or you are not the admin",
      "Organization not found or you are not the admin",
    );
  }
  const updatedOrg = await updateOrganization({
    orgId,
    userId: adminId,
    name,
    logoUrl,
    description,
    websiteUrl,
  });
  return updatedOrg;
};

export const deleteOrganizationService = async ({
  orgId,
  adminId,
}: {
  orgId: string;
  adminId: string;
}) => {
  const org = await getOrgByAdminId(adminId, orgId);
  if (!org) {
    throw new ApiError(
      404,
      "Organization not found or you are not the admin",
      "Organization not found or you are not the admin",
    );
  }
  await deleteOrganization(orgId, adminId);
};

export const getOrgByIdService = async (orgId: string, userId: string) => {
  const isMember = await userMemberOfOrg(userId, orgId);
  if (!isMember) {
    throw new ApiError(
      403,
      "You do not have access to this organization",
      "You do not have access to this organization",
    );
  }
  const key = `org:${orgId}`;
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  const org = await getOrgById(orgId);
  if (!org) {
    throw new ApiError(404, "Organization not found", "Organization not found");
  }
  await redis.set(key, JSON.stringify(org), "EX", 300);
  return org;
};

export const removeOrgMemberService = async ({
  orgId,
  targetUserId,
  requesterId,
}: {
  orgId: string;
  targetUserId: string;
  requesterId: string;
}) => {
  const org = await getOrgByAdminId(requesterId, orgId);
  if (!org) {
    throw new ApiError(
      403,
      "Only organization admins can remove members",
      "Only organization admins can remove members",
    );
  }

  const isMember = await userMemberOfOrg(targetUserId, orgId);
  if (!isMember) {
    throw new ApiError(
      404,
      "User is not a member of this organization",
      "User is not a member of this organization",
    );
  }

  if (targetUserId === requesterId) {
    throw new ApiError(
      400,
      "You cannot remove yourself from the organization",
      "You cannot remove yourself from the organization",
    );
  }

  await removeOrgMember(targetUserId, orgId);
};

export const getAllMembersOfOrgService = async (
  orgId: string,
  userId: string,
) => {
  const isMember = await userMemberOfOrg(userId, orgId);
  if (!isMember) {
    throw new ApiError(
      403,
      "You do not have access to this organization",
      "You do not have access to this organization",
    );
  }
  const org = await getOrgById(orgId);
  if (!org) {
    throw new ApiError(404, "Organization not found", "Organization not found");
  }
  return await getAllMembersOfOrg(orgId);
};
