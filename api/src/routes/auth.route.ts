import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
  uploadUserAvatar,
  verifyEmail,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  loginUserSchema,
  registerUserSchema,
  updateUserProfileSchema,
  uploadUserAvatarSchema,
  verifyEmailSchema,
} from "../validations/auth.validation";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.get("/me", authMiddleware, getUserProfile);
router.patch(
  "/me",
  authMiddleware,
  validate(updateUserProfileSchema),
  updateUserProfile,
);
router.patch(
  "/me/avatar",
  authMiddleware,
  upload.single("file"),
  validate(uploadUserAvatarSchema),
  uploadUserAvatar,
);

export default router;
