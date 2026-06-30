import { createServer } from "http";
import app from "./app";
import "dotenv/config";
import { connectDb } from "./configs/db.config";
import { Server } from "socket.io";
import { registerSocketEvents } from "./ws";

const PORT = process.env.PORT;

export const server = createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_ORIGIN, credentials: true },
});
registerSocketEvents(io);

connectDb().then(() => {
  server.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
