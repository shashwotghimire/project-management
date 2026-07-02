import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { connectDb } from "./configs/db.config";
import { Server } from "socket.io";
import { registerSocketEvents } from "./ws";
import { setNotificationServer } from "./ws/notification";

const PORT = process.env.PORT;

export const server = createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_ORIGIN, credentials: true },
});
setNotificationServer(io);
registerSocketEvents(io);

connectDb().then(() => {
  server.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
