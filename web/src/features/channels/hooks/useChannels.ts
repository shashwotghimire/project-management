import {
  createChannelService,
  deleteChannelService,
  getChannelByIdService,
  getChannelsService,
  updateChannelService,
} from "@/services/channels.service";
import {
  Channel,
  CreateChannelRequest,
  DeleteChannelRequest,
  UpdateChannelRequest,
} from "@/types/channel-api.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetChannels = (orgId: string, projectId: string) => {
  return useQuery<Channel[]>({
    queryKey: ["channels", orgId, projectId],
    queryFn: () => getChannelsService(orgId, projectId),
  });
};

export const useGetChannelById = (
  orgId: string,
  projectId: string,
  channelId: string,
) => {
  return useQuery<Channel>({
    queryKey: ["channel", orgId, projectId, channelId],
    queryFn: () => getChannelByIdService(orgId, projectId, channelId),
    enabled: !!channelId,
  });
};

export const useCreateChannel = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Channel, Error, CreateChannelRequest>({
    mutationFn: createChannelService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels", orgId, projectId] });
    },
  });
};

export const useUpdateChannel = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Channel, Error, UpdateChannelRequest>({
    mutationFn: updateChannelService,
    onSuccess: (updated) => {
      queryClient.setQueryData<Channel>(
        ["channel", orgId, projectId, updated.id],
        updated,
      );
      queryClient.invalidateQueries({ queryKey: ["channels", orgId, projectId] });
    },
  });
};

export const useDeleteChannel = (orgId: string, projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeleteChannelRequest>({
    mutationFn: deleteChannelService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels", orgId, projectId] });
    },
  });
};
