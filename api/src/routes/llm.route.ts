import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { llmResponse, regenerateLlmResponse } from "../controllers/llm.controller";

const router = Router();

router.get("/:orgId/summary", authMiddleware, llmResponse);
router.post("/:orgId/summary/regenerate", authMiddleware, regenerateLlmResponse);

export default router;
