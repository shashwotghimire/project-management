import { ApiError } from "../helpers/ApiError";
import { getOrgActivityLogs, getTaskActivityLogs } from "../repositories/activity-log.repository";
import { userMemberOfOrg } from "../repositories/organizations.repository";
import { isUserMemberOfProject } from "../repositories/projects.repository";
import { getS3PresignedUrl } from "./s3.service";

async function resolveGravatarUrl(url: string | null | undefined): Promise<string | null> {
  if (typeof url === "string" && url.startsWith("uploads/")) {
    return await getS3PresignedUrl(url);
  }
  return url ?? null;
}

async function resolveLogActors(rows: any[]): Promise<any[]> {
  return Promise.all(
    rows.map(async (row) => {
      const plain = row.toJSON ? row.toJSON() : { ...row };
      if (plain.actor) {
        plain.actor = { ...plain.actor, gravatarUrl: await resolveGravatarUrl(plain.actor.gravatarUrl) };
      }
      if (plain.targetUser) {
        plain.targetUser = { ...plain.targetUser, gravatarUrl: await resolveGravatarUrl(plain.targetUser.gravatarUrl) };
      }
      return plain;
    }),
  );
}

export const getOrgActivityLogsService = async ({
  orgId,
  userId,
  page,
  limit,
}: {
  orgId: string;
  userId: string;
  page: number;
  limit: number;
}) => {
  const isMember = await userMemberOfOrg(userId, orgId);
  if (!isMember) {
    throw new ApiError(403, "You do not have access to this organization", "Forbidden");
  }

  const offset = (page - 1) * limit;
  const { count, rows } = await getOrgActivityLogs(orgId, limit, offset);

  return {
    total: count,
    page,
    limit,
    logs: await resolveLogActors(rows),
  };
};

export const getTaskActivityLogsService = async ({
  taskId,
  projectId,
  userId,
  page,
  limit,
}: {
  taskId: string;
  projectId: string;
  userId: string;
  page: number;
  limit: number;
}) => {
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) {
    throw new ApiError(403, "You do not have access to this project", "Forbidden");
  }

  const offset = (page - 1) * limit;
  const { count, rows } = await getTaskActivityLogs(taskId, limit, offset);

  return {
    total: count,
    page,
    limit,
    logs: await resolveLogActors(rows),
  };
};
