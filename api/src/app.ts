import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.route";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use("/api/auth", authRoutes);

app.use(errorHandler);
export default app;
