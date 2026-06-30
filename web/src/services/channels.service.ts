import api from "@/lib/axios";
import {
  Channel,
  ChannelResponse,
  ChannelsListResponse,
  CreateChannelRequest,
  DeleteChannelRequest,
  UpdateChannelRequest,
} from "@/types/channel-api.types";

const base = (orgId: string, projectId: string) =>
  `/organizations/${orgId}/projects/${projectId}/channels`;

export const getChannelsService = async (
  orgId: string,
  projectId: string,
): Promise<Channel[]> => {
  const response = await api.get<ChannelsListResponse>(base(orgId, projectId));
  return response.data.data;
};

export const getChannelByIdService = async (
  orgId: string,
  projectId: string,
  channelId: string,
): Promise<Channel> => {
  const response = await api.get<ChannelResponse>(`${base(orgId, projectId)}/${channelId}`);
  return response.data.data;
};

export const createChannelService = async ({
  orgId,
  projectId,
  name,
}: CreateChannelRequest): Promise<Channel> => {
  const response = await api.post<ChannelResponse>(base(orgId, projectId), { name });
  return response.data.data;
};

export const updateChannelService = async ({
  orgId,
  projectId,
  channelId,
  name,
}: UpdateChannelRequest): Promise<Channel> => {
  const response = await api.patch<ChannelResponse>(
    `${base(orgId, projectId)}/${channelId}`,
    { name },
  );
  return response.data.data;
};

export const deleteChannelService = async ({
  orgId,
  projectId,
  channelId,
}: DeleteChannelRequest): Promise<void> => {
  await api.delete(`${base(orgId, projectId)}/${channelId}`);
};
