import { Router } from "express";
import {
  createOrganizaiton,
  deleteOrganization,
  getUsersOrganizations,
  updateOrganization,
} from "../controller/organizations.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createOrganizationSchema,
  deleteOrganizationSchema,
  getUsersOrganizationsSchema,
  updateOrganizationSchema,
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

router.patch(
  "/:orgId",
  authMiddleware,
  validate(updateOrganizationSchema),
  updateOrganization,
);

router.delete(
  "/:orgId",
  authMiddleware,
  validate(deleteOrganizationSchema),
  deleteOrganization,
);
export default router;
