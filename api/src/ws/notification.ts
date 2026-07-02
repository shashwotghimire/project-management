import { Server } from "socket.io";

let io: Server | null = null;

export const setNotificationServer = (server: Server) => {
  io = server;
};

export const emitNotificationToUser = (userId: string, payload: any) => {
  if (!io) return;
  io.to(`user:${userId}`).emit("notification:new", payload);
  console.log(`notification sent:${JSON.stringify(payload.toJSON())}`);
};
