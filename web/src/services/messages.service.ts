import api from "@/lib/axios";
import {
  Message,
  MessageResponse,
  MessagesListResponse,
  SendMessageRequest,
} from "@/types/message-api.types";

const base = (orgId: string, projectId: string, channelId: string) =>
  `/organizations/${orgId}/projects/${projectId}/channels/${channelId}/messages`;

export const getMessagesService = async (
  orgId: string,
  projectId: string,
  channelId: string,
): Promise<Message[]> => {
  const response = await api.get<MessagesListResponse>(base(orgId, projectId, channelId));
  return response.data.data;
};

export const sendMessageService = async ({
  orgId,
  projectId,
  channelId,
  content,
}: SendMessageRequest): Promise<Message> => {
  const response = await api.post<MessageResponse>(base(orgId, projectId, channelId), {
    content,
  });
  return response.data.data;
};
