import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.route";
import organizationRoutes from "./routes/organizations.route";
import invitationRoutes from "./routes/invitation.route";
import projectRoutes from "./routes/projects.route";
import taskRoutes from "./routes/tasks.route";
import commentRoutes from "./routes/comments.route";
import channelRoutes from "./routes/channels.route";
import aiRoutes from "./routes/llm.route";
import notificationRoutes from "./routes/notifications.route";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/organizations/:orgId/notifications", notificationRoutes);
app.use("/api/organizations/:orgId/projects", projectRoutes);
app.use("/api/organizations/:orgId/projects/:projectId/tasks", taskRoutes);
app.use(
  "/api/organizations/:orgId/projects/:projectId/tasks/:taskId/comments",
  commentRoutes,
);
app.use(
  "/api/organizations/:orgId/projects/:projectId/channels",
  channelRoutes,
);

app.use(errorHandler);
export default app;
