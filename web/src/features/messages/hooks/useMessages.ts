import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessagesService, sendMessageService } from "@/services/messages.service";
import { Message, SendMessageRequest } from "@/types/message-api.types";

export const useGetMessages = (
  orgId: string,
  projectId: string,
  channelId: string,
) => {
  return useQuery<Message[]>({
    queryKey: ["messages", orgId, projectId, channelId],
    queryFn: () => getMessagesService(orgId, projectId, channelId),
    enabled: !!channelId,
  });
};

export const useSendMessage = (
  orgId: string,
  projectId: string,
  channelId: string,
) => {
  const queryClient = useQueryClient();
  return useMutation<Message, Error, SendMessageRequest>({
    mutationFn: sendMessageService,
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(
        ["messages", orgId, projectId, channelId],
        (old) => (old ? [...old, newMessage] : [newMessage]),
      );
    },
  });
};
