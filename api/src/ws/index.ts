import { Server, Socket } from "socket.io";
import { verifyAccessToken } from "../helpers/jwt.helper";
import { createMessage } from "../repositories/messages.repository";

export interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const registerSocketEvents = (io: Server) => {
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Unauthorized"));

    try {
      const payload = verifyAccessToken(token) as { id: string };
      socket.userId = payload.id;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log("a user connected");

    socket.on("joinChannel", (channelId: string) => {
      socket.join(channelId);
      console.log(`User joined channel ${channelId}`);
    });

    socket.on("leaveChannel", (channelId: string) => {
      socket.leave(channelId);
      console.log(`User left channel ${channelId}`);
    });

    socket.on("sendMessage", async (channelId: string, content: string) => {
      try {
        const message = await createMessage(channelId, socket.userId!, content);
        io.to(channelId).emit("newMessage", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
