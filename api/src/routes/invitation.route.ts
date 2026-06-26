import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createInvitationSchema,
  respondToInvitationSchema,
} from "../validations/invitation.validation";
import {
  createInvitation,
  getInvitationDetails,
  respondToInvitation,
} from "../controllers/invitation.controller";

const router = Router();

router.get("/details", getInvitationDetails);

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
