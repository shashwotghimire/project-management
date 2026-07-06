import { Router } from "express";
import {
  getOrganizationsForAdmin,
  getOrganizationDetailsForAdmin,
  blockOrganization,
  unblockOrganization,
  getUsersForAdmin,
  getPlatformStats,
} from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { superAdminMiddleware } from "../middlewares/superadmin.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  getOrganizationsSchema,
  getOrganizationDetailsSchema,
  blockOrganizationSchema,
  unblockOrganizationSchema,
  getUsersSchema,
} from "../validations/admin.validation";

const router = Router();

router.get(
  "/organizations",
  authMiddleware,
  superAdminMiddleware,
  validate(getOrganizationsSchema),
  getOrganizationsForAdmin,
);

router.get(
  "/organizations/:orgId",
  authMiddleware,
  superAdminMiddleware,
  validate(getOrganizationDetailsSchema),
  getOrganizationDetailsForAdmin,
);

router.patch(
  "/organizations/:orgId/block",
  authMiddleware,
  superAdminMiddleware,
  validate(blockOrganizationSchema),
  blockOrganization,
);

router.patch(
  "/organizations/:orgId/unblock",
  authMiddleware,
  superAdminMiddleware,
  validate(unblockOrganizationSchema),
  unblockOrganization,
);

router.get(
  "/users",
  authMiddleware,
  superAdminMiddleware,
  validate(getUsersSchema),
  getUsersForAdmin,
);

router.get(
  "/stats",
  authMiddleware,
  superAdminMiddleware,
  getPlatformStats,
);

export default router;
