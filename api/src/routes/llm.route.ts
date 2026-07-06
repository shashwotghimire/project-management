import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { llmResponse } from "../controllers/llm.controller";

const router = Router();

router.get("/:orgId/summary", authMiddleware, llmResponse);

export default router;
