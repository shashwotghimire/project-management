import {
  getAllOrganizationsForAdmin,
  getOrganizationDetailsForAdmin,
  setOrganizationBlockedStatus,
  getPlatformStats,
} from "../repositories/organizations.repository";
import { getAllUsersForAdmin } from "../repositories/users.repository";
import redis from "../configs/redis-client.config";
import { findUserById } from "../repositories/users.repository";
import { getS3PresignedUrl } from "./s3.service";
import { createNotificationService } from "./notifications.service";
import { emailQueue } from "../queues/email.queue";
import {
  orgSuspendedEmailTemplate,
  orgUnsuspendedEmailTemplate,
} from "../utils/email-template.utils";
import { ApiError } from "../helpers/ApiError";

export const getOrganizationsForAdminService = async ({
  page = 1,
  limit = 10,
  query = "",
}: {
  page: number;
  limit: number;
  query?: string;
}) => {
  const cacheKey = `admin:orgs:page:${page}:limit:${limit}:query:${query}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const result = await getAllOrganizationsForAdmin({ page, limit, query });

  await Promise.all(
    result.organizations.map(async (org: any) => {
      if (typeof org.logoUrl === "string" && org.logoUrl.startsWith("uploads/")) {
        org.logoUrl = await getS3PresignedUrl(org.logoUrl);
      }
    }),
  );

  await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
  return result;
};

export const getOrganizationDetailsForAdminService = async (orgId: string) => {
  const cacheKey = `admin:orgDetails:${orgId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const result = await getOrganizationDetailsForAdmin(orgId);
  if (!result) {
    throw new ApiError(404, "Organization not found", "Organization not found");
  }

  if (typeof result.logoUrl === "string" && result.logoUrl.startsWith("uploads/")) {
    result.logoUrl = await getS3PresignedUrl(result.logoUrl);
  }

  if (Array.isArray(result.members)) {
    await Promise.all(
      result.members.map(async (member: any) => {
        const url = member.User?.gravatarUrl ?? member.dataValues?.User?.gravatarUrl;
        if (typeof url === "string" && url.startsWith("uploads/")) {
          const presigned = await getS3PresignedUrl(url);
          if (member.User) member.User.gravatarUrl = presigned;
        }
      }),
    );
  }

  await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
  return result;
};

export const setOrganizationBlockedStatusService = async (
  orgId: string,
  blocked: boolean,
) => {
  const org = await setOrganizationBlockedStatus(orgId, blocked);
  if (!org) {
    throw new ApiError(404, "Organization not found", "Organization not found");
  }

  // Redis invalidation
  const orgKeys = await redis.keys("admin:orgs:*");
  const statsKeys = await redis.keys("admin:stats*");
  const detailsKeys = await redis.keys(`admin:orgDetails:${orgId}`);
  const toDelete = [...orgKeys, ...statsKeys, ...detailsKeys, `org:${orgId}`];
  if (toDelete.length > 0) {
    await redis.del(...toDelete);
  }

  // Fetch admin info
  const admin = await findUserById(org.adminId);
  if (admin) {
    // 1. In-app notification
    await createNotificationService({
      userId: org.adminId,
      orgId: org.id,
      title: blocked ? "Organization suspended" : "Organization reactivated",
      message: blocked
        ? `Your organization "${org.name}" has been suspended by a platform administrator.`
        : `Your organization "${org.name}" has been reactivated.`,
    });

    // 2. Queued email
    const subject = blocked
      ? `Important: Organization Suspended - ${org.name}`
      : `Reactivation: Organization Ready - ${org.name}`;

    const html = blocked
      ? orgSuspendedEmailTemplate(admin.username, org.name)
      : orgUnsuspendedEmailTemplate(admin.username, org.name);

    await emailQueue.add(
      blocked ? "org-suspended" : "org-unsuspended",
      {
        to: admin.email,
        subject,
        html,
      },
      {
        attempts: 3,
        backoff: { type: "exponential", delay: 5000 },
      },
    ).catch((err) => {
      console.error("Failed to add email to queue:", err);
    });
  }

  return org;
};

export const getUsersForAdminService = async ({
  page = 1,
  limit = 10,
  query = "",
}: {
  page: number;
  limit: number;
  query?: string;
}) => {
  const cacheKey = `admin:users:page:${page}:limit:${limit}:query:${query}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const result = await getAllUsersForAdmin({ page, limit, query });

  await Promise.all(
    result.users.map(async (user: any) => {
      const url = user.gravatarUrl ?? user.dataValues?.gravatarUrl;
      if (typeof url === "string" && url.startsWith("uploads/")) {
        user.gravatarUrl = await getS3PresignedUrl(url);
      }
    }),
  );

  await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
  return result;
};

export const getPlatformStatsService = async () => {
  const cacheKey = "admin:stats";
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const result = await getPlatformStats();
  await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
  return result;
};
