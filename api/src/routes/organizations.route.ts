import { Router } from "express";
import {
  createOrganizaiton,
  deleteOrganization,
  getAllMembersOfOrg,
  getOrgById,
  getUsersOrganizations,
  removeOrgMember,
  updateOrganization,
  uploadOrgLogo,
} from "../controllers/organizations.controller";
import { getTasksAssignedToUser, getUserTasksForCalendar } from "../controllers/tasks.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createOrganizationSchema,
  deleteOrganizationSchema,
  getAllMembersOfOrgSchema,
  getOrgByIdSchema,
  getUsersOrganizationsSchema,
  removeOrgMemberSchema,
  updateOrganizationSchema,
  uploadOrgLogoSchema,
} from "../validations/organizations.validation";
import { upload } from "../middlewares/multer.middleware";
import { getTasksAssignedToUserSchema, getUserTasksForCalendarSchema } from "../validations/tasks.validation";

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

router.delete(
  "/:orgId/members/:userId",
  authMiddleware,
  validate(removeOrgMemberSchema),
  removeOrgMember,
);

router.get(
  "/:orgId/my-tasks",
  authMiddleware,
  validate(getTasksAssignedToUserSchema),
  getTasksAssignedToUser,
);

router.get(
  "/:orgId/calendar-tasks",
  authMiddleware,
  validate(getUserTasksForCalendarSchema),
  getUserTasksForCalendar,
);

router.patch(
  "/:orgId/logo",
  authMiddleware,
  upload.single("file"),
  validate(uploadOrgLogoSchema),
  uploadOrgLogo,
);

export default router;
