import z from "zod";

const channelParams = z.object({
  orgId: z.uuidv4("Invalid organization ID"),
  projectId: z.uuidv4("Invalid project ID"),
});

export const createChannelSchema = z.object({
  params: channelParams,
  body: z.object({
    name: z.string().min(1, "Channel name is required").max(50),
  }),
});

export const listChannelsSchema = z.object({
  params: channelParams,
});

export const updateChannelSchema = z.object({
  params: channelParams.extend({
    channelId: z.uuidv4("Invalid channel ID"),
  }),
  body: z.object({
    name: z.string().min(1).max(50),
  }),
});

export const deleteChannelSchema = z.object({
  params: channelParams.extend({
    channelId: z.uuidv4("Invalid channel ID"),
  }),
});

export const getChannelSchema = z.object({
  params: channelParams.extend({
    channelId: z.uuidv4("Invalid channel ID"),
  }),
});

export const getChannelMessagesSchema = z.object({
  params: channelParams.extend({
    channelId: z.uuidv4("Invalid channel ID"),
  }),
});

export const sendMessageSchema = z.object({
  params: channelParams.extend({
    channelId: z.uuidv4("Invalid channel ID"),
  }),
  body: z.object({
    content: z.string().min(1, "Message content is required"),
  }),
});
