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
  updateOrgLogo,
  userMemberOfOrg,
} from "../repositories/organizations.repository";
import { uploadToS3, getS3PresignedUrl, deleteFromS3 } from "./s3.service";
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
  const cacheKey = `org:${orgId}`;
  const cached = await redis.get(cacheKey);
  let plain: Record<string, unknown>;

  if (cached) {
    plain = JSON.parse(cached);
  } else {
    const org = await getOrgById(orgId);
    if (!org) throw new ApiError(404, "Organization not found", "Organization not found");
    plain = org.toJSON() as Record<string, unknown>;
    await redis.set(cacheKey, JSON.stringify(plain), "EX", 300);
  }

  if (typeof plain.logoUrl === "string" && plain.logoUrl.startsWith("uploads/")) {
    plain.logoUrl = await getS3PresignedUrl(plain.logoUrl);
  }
  return plain;
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
  const raw = await getAllMembersOfOrg(orgId);
  return Promise.all(
    raw.map(async (row: any) => {
      const plain = row.toJSON ? row.toJSON() : { ...row };
      if (typeof plain.User?.gravatarUrl === "string" && plain.User.gravatarUrl.startsWith("uploads/")) {
        plain.User.gravatarUrl = await getS3PresignedUrl(plain.User.gravatarUrl);
      }
      return plain;
    }),
  );
};

export const uploadOrgLogoService = async ({
  orgId,
  adminId,
  file,
}: {
  orgId: string;
  adminId: string;
  file: Express.Multer.File;
}) => {
  const org = await getOrgByAdminId(adminId, orgId);
  if (!org) throw new ApiError(403, "Forbidden", "Only the org admin can upload a logo");

  const oldKey = org.logoUrl?.startsWith("uploads/") ? org.logoUrl : null;

  const { key } = await uploadToS3(file);
  const updated = await updateOrgLogo(orgId, adminId, key);

  if (oldKey) deleteFromS3(oldKey).catch(() => {});

  await redis.del(`org:${orgId}`);
  const url = await getS3PresignedUrl(key);
  return { org: updated, url };
};
