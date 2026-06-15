import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  verifyEmail,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  loginUserSchema,
  registerUserSchema,
  verifyEmailSchema,
} from "../validations/auth.validation";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.get("/me", authMiddleware, getUserProfile);

export default router;
