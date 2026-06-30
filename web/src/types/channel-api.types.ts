export interface Channel {
  id: string;
  projectId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChannelRequest {
  orgId: string;
  projectId: string;
  name: string;
}

export interface UpdateChannelRequest {
  orgId: string;
  projectId: string;
  channelId: string;
  name: string;
}

export interface DeleteChannelRequest {
  orgId: string;
  projectId: string;
  channelId: string;
}

export interface ChannelResponse {
  success: boolean;
  message: string;
  data: Channel;
}

export interface ChannelsListResponse {
  success: boolean;
  message: string;
  data: Channel[];
}
