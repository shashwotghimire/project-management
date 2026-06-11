import { Router } from "express";
import {
  createOrganizaiton,
  getUsersOrganizations,
} from "../controller/organizations.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createOrganizationSchema,
  getUsersOrganizationsSchema,
} from "../validations/organizations.validation";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createOrganizationSchema),
  createOrganizaiton,
);

router.get(
  "/",
  authMiddleware,
  validate(getUsersOrganizationsSchema),
  getUsersOrganizations,
);

export default router;
