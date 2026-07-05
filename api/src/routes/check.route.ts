import { Router } from "express";
import { healthCheck } from "../controllers/check.controller";

const router = Router();

router.get("/", healthCheck);

export default router;
