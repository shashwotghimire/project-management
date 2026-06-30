export interface MessageSender {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender: MessageSender;
}

export interface SendMessageRequest {
  orgId: string;
  projectId: string;
  channelId: string;
  content: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: Message;
}

export interface MessagesListResponse {
  success: boolean;
  message: string;
  data: Message[];
}
