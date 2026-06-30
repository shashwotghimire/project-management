import { Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiResponse } from "../helpers/ApiResponse";
import { isString } from "../helpers/check-string.helper";
import {
  createChannelService,
  deleteChannelService,
  getChannelMessagesService,
  getChannelService,
  listChannelsService,
  sendMessageService,
  updateChannelService,
} from "../services/channels.service";

export const createChannel = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const projectId = isString(req.params.projectId);
    const { name } = req.body;
    const channel = await createChannelService(req.user.id, orgId, projectId, name);
    return res.status(201).json(new ApiResponse(true, "Channel created", channel));
  },
);

export const listChannels = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const channels = await listChannelsService(req.user.id, projectId);
    return res.status(200).json(new ApiResponse(true, "Channels fetched", channels));
  },
);

export const getChannel = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const channelId = isString(req.params.channelId);
    const channel = await getChannelService(req.user.id, projectId, channelId);
    return res.status(200).json(new ApiResponse(true, "Channel fetched", channel));
  },
);

export const updateChannel = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const projectId = isString(req.params.projectId);
    const channelId = isString(req.params.channelId);
    const { name } = req.body;
    const channel = await updateChannelService(req.user.id, orgId, projectId, channelId, name);
    return res.status(200).json(new ApiResponse(true, "Channel updated", channel));
  },
);

export const getChannelMessages = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const channelId = isString(req.params.channelId);
    const messages = await getChannelMessagesService(req.user.id, projectId, channelId);
    return res.status(200).json(new ApiResponse(true, "Messages fetched", messages));
  },
);

export const sendMessage = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const projectId = isString(req.params.projectId);
    const channelId = isString(req.params.channelId);
    const { content } = req.body;
    const message = await sendMessageService(req.user.id, projectId, channelId, content);
    return res.status(201).json(new ApiResponse(true, "Message sent", message));
  },
);

export const deleteChannel = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const orgId = isString(req.params.orgId);
    const projectId = isString(req.params.projectId);
    const channelId = isString(req.params.channelId);
    await deleteChannelService(req.user.id, orgId, projectId, channelId);
    return res.status(200).json(new ApiResponse(true, "Channel deleted", null));
  },
);
