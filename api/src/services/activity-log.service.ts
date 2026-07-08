import { ApiError } from "../helpers/ApiError";
import { getOrgActivityLogs, getTaskActivityLogs } from "../repositories/activity-log.repository";
import { userMemberOfOrg } from "../repositories/organizations.repository";
import { isUserMemberOfProject } from "../repositories/projects.repository";

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
    logs: rows,
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
    logs: rows,
  };
};
