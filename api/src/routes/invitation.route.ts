import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createInvitationSchema,
  respondToInvitationSchema,
} from "../validations/invitation.validation";
import {
  createInvitation,
  respondToInvitation,
} from "../controllers/invitation.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createInvitationSchema),
  createInvitation,
);

router.post(
  "/respond",
  authMiddleware,
  validate(respondToInvitationSchema),
  respondToInvitation,
);
export default router;
