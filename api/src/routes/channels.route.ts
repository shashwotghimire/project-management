import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createChannelSchema,
  deleteChannelSchema,
  getChannelMessagesSchema,
  getChannelSchema,
  listChannelsSchema,
  sendMessageSchema,
  updateChannelSchema,
} from "../validations/channels.validation";
import {
  createChannel,
  deleteChannel,
  getChannel,
  getChannelMessages,
  listChannels,
  sendMessage,
  updateChannel,
} from "../controllers/channels.controller";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, validate(listChannelsSchema), listChannels);
router.post("/", authMiddleware, validate(createChannelSchema), createChannel);
router.get("/:channelId", authMiddleware, validate(getChannelSchema), getChannel);
router.patch("/:channelId", authMiddleware, validate(updateChannelSchema), updateChannel);
router.delete("/:channelId", authMiddleware, validate(deleteChannelSchema), deleteChannel);
router.get("/:channelId/messages", authMiddleware, validate(getChannelMessagesSchema), getChannelMessages);
router.post("/:channelId/messages", authMiddleware, validate(sendMessageSchema), sendMessage);

export default router;
