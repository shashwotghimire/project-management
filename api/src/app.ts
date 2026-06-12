import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.route";
import organizationRoutes from "./routes/organizations.route";
import invitationRoutes from "./routes/invitation.route";

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

app.use(errorHandler);
export default app;
