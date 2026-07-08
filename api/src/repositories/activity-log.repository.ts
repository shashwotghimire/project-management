import { OrgActivityAction, OrgActivityLog } from "../models/activity-log.model";
import { TaskActivityAction, TaskActivityLog } from "../models/task-activity-log.model";
import { User } from "../models/users.model";
import { Project } from "../models/projects.model";

export const createOrgActivityLog = async (data: {
  orgId: string;
  actorId: string;
  action: OrgActivityAction;
  targetUserId?: string;
  projectId?: string;
  meta?: object;
}) => {
  return await OrgActivityLog.create({
    orgId: data.orgId,
    actorId: data.actorId,
    action: data.action,
    targetUserId: data.targetUserId ?? null,
    projectId: data.projectId ?? null,
    meta: data.meta ?? null,
  });
};

export const getOrgActivityLogs = async (
  orgId: string,
  limit = 50,
  offset = 0
) => {
  return await OrgActivityLog.findAndCountAll({
    where: { orgId },
    include: [
      {
        model: User,
        as: "actor",
        attributes: ["id", "username", "gravatarUrl"],
      },
      {
        model: User,
        as: "targetUser",
        attributes: ["id", "username", "gravatarUrl"],
      },
      {
        model: Project,
        as: "project",
        attributes: ["id", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });
};

export const createTaskActivityLog = async (data: {
  taskId: string;
  projectId: string;
  actorId: string;
  action: TaskActivityAction;
  meta?: object;
}) => {
  return await TaskActivityLog.create({
    taskId: data.taskId,
    projectId: data.projectId,
    actorId: data.actorId,
    action: data.action,
    meta: data.meta ?? null,
  });
};

export const getTaskActivityLogs = async (
  taskId: string,
  limit = 50,
  offset = 0
) => {
  return await TaskActivityLog.findAndCountAll({
    where: { taskId },
    include: [
      {
        model: User,
        as: "actor",
        attributes: ["id", "username", "gravatarUrl"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });
};
