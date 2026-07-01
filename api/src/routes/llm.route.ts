import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { llmResponse } from "../controllers/llm.controller";

const router = Router();

router.get("/", llmResponse);

export default router;
