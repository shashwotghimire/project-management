import { Channel } from "../models/channel.model";

export const createChannel = (projectId: string, name: string) =>
  Channel.create({ projectId, name });

export const getChannelsByProject = (projectId: string) =>
  Channel.findAll({ where: { projectId }, order: [["createdAt", "ASC"]] });

export const getChannelById = (channelId: string, projectId: string) =>
  Channel.findOne({ where: { id: channelId, projectId } });

export const getChannelByIdOnly = (channelId: string) =>
  Channel.findByPk(channelId);

export const updateChannel = async (
  channelId: string,
  projectId: string,
  name: string,
) => {
  const channel = await Channel.findOne({ where: { id: channelId, projectId } });
  if (!channel) return null;
  channel.name = name;
  return channel.save();
};

export const deleteChannel = async (channelId: string, projectId: string) => {
  const channel = await Channel.findOne({ where: { id: channelId, projectId } });
  if (!channel) return false;
  await channel.destroy();
  return true;
};
