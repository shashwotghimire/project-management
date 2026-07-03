import { ApiError } from "../helpers/ApiError";
import { getOrgByAdminId } from "../repositories/organizations.repository";
import {
  getProjectById,
  getProjectMembers,
  isUserMemberOfProject,
} from "../repositories/projects.repository";
import {
  createChannel,
  deleteChannel,
  getChannelById,
  getChannelsByProject,
  updateChannel,
} from "../repositories/channels.repository";
import {
  createMessage,
  getMessagesByChannel,
} from "../repositories/messages.repository";
import { emailQueue } from "../queues/email.queue";
import { channelMessageEmailTemplate } from "../utils/email-template.utils";
import { findUserById } from "../repositories/users.repository";
import { getS3PresignedUrl } from "./s3.service";

const assertOrgAdmin = async (userId: string, orgId: string) => {
  const org = await getOrgByAdminId(userId, orgId);
  if (!org) throw new ApiError(403, "Forbidden", "Only org admins can manage channels");
};

const assertProjectMember = async (userId: string, projectId: string) => {
  const isMember = await isUserMemberOfProject(userId, projectId);
  if (!isMember) throw new ApiError(403, "Forbidden", "You are not a member of this project");
};

export const createChannelService = async (
  userId: string,
  orgId: string,
  projectId: string,
  name: string,
) => {
  await assertOrgAdmin(userId, orgId);
  return createChannel(projectId, name);
};

export const listChannelsService = async (userId: string, projectId: string) => {
  await assertProjectMember(userId, projectId);
  return getChannelsByProject(projectId);
};

export const updateChannelService = async (
  userId: string,
  orgId: string,
  projectId: string,
  channelId: string,
  name: string,
) => {
  await assertOrgAdmin(userId, orgId);
  const channel = await updateChannel(channelId, projectId, name);
  if (!channel) throw new ApiError(404, "Not Found", "Channel not found");
  return channel;
};

export const deleteChannelService = async (
  userId: string,
  orgId: string,
  projectId: string,
  channelId: string,
) => {
  await assertOrgAdmin(userId, orgId);
  const deleted = await deleteChannel(channelId, projectId);
  if (!deleted) throw new ApiError(404, "Not Found", "Channel not found");
};

export const getChannelMessagesService = async (
  userId: string,
  projectId: string,
  channelId: string,
) => {
  await assertProjectMember(userId, projectId);
  const raw = await getMessagesByChannel(channelId);
  return Promise.all(
    raw.map(async (row: any) => {
      const plain = row.toJSON ? row.toJSON() : { ...row };
      if (typeof plain.sender?.gravatarUrl === "string" && plain.sender.gravatarUrl.startsWith("uploads/")) {
        plain.sender.gravatarUrl = await getS3PresignedUrl(plain.sender.gravatarUrl);
      }
      return plain;
    }),
  );
};

export const sendMessageService = async (
  userId: string,
  projectId: string,
  channelId: string,
  content: string,
) => {
  await assertProjectMember(userId, projectId);
  const message = await createMessage(channelId, userId, content);

  const sender = await findUserById(userId);
  const channel = await getChannelById(channelId, projectId);
  const project = await getProjectById(projectId);
  const members = await getProjectMembers(projectId);

  if (sender && channel && project) {
    for (const membership of members) {
      const member = (membership as any).member;
      if (!member || member.id === userId) continue;
      await emailQueue.add("channel-message", {
        to: member.email,
        subject: `New message in #${channel.name} — ${project.name}`,
        html: channelMessageEmailTemplate(
          member.username,
          sender.username,
          channel.name,
          project.name,
          content,
        ),
      });
    }
  }

  return message;
};

export const getChannelService = async (
  userId: string,
  projectId: string,
  channelId: string,
) => {
  await assertProjectMember(userId, projectId);
  const channel = await getChannelById(channelId, projectId);
  if (!channel) throw new ApiError(404, "Not Found", "Channel not found");
  return channel;
};
