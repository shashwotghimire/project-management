import { Messages } from "../models/messages.model";
import { User } from "../models/users.model";

export async function createMessage(
  channelId: string,
  senderId: string,
  content: string,
) {
  const message = await Messages.create({ channelId, senderId, content });
  return message.reload({
    include: [{ model: User, as: "sender", attributes: ["id", "name"] }],
  });
}

export async function getMessagesByChannel(channelId: string) {
  return Messages.findAll({
    where: { channelId },
    include: [{ model: User, as: "sender", attributes: ["id", "name"] }],
    order: [["createdAt", "ASC"]],
  });
}
