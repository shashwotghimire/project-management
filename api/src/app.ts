import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.route";
import organizationRoutes from "./routes/organizations.route";
import invitationRoutes from "./routes/invitation.route";
import projectRoutes from "./routes/projects.route";
import taskRoutes from "./routes/tasks.route";
import commentRoutes from "./routes/comments.route";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/organizations/:orgId/projects", projectRoutes);
app.use("/api/organizations/:orgId/projects/:projectId/tasks", taskRoutes);
app.use("/api/organizations/:orgId/projects/:projectId/tasks/:taskId/comments", commentRoutes);

app.use(errorHandler);
export default app;
