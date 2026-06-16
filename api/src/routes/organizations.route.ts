import { Router } from "express";
import {
  createOrganizaiton,
  deleteOrganization,
  getAllMembersOfOrg,
  getOrgById,
  getUsersOrganizations,
  updateOrganization,
} from "../controllers/organizations.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createOrganizationSchema,
  deleteOrganizationSchema,
  getAllMembersOfOrgSchema,
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

router.get(
  "/:orgId/members",
  authMiddleware,
  validate(getAllMembersOfOrgSchema),
  getAllMembersOfOrg,
);

export default router;
