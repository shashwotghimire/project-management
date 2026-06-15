import { Router } from "express";
import {
  createOrganizaiton,
  deleteOrganization,
  getOrgById,
  getUsersOrganizations,
  updateOrganization,
} from "../controllers/organizations.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createOrganizationSchema,
  deleteOrganizationSchema,
  getOrgByIdSchema,
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

router.get("/:orgId", authMiddleware, validate(getOrgByIdSchema), getOrgById);

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
