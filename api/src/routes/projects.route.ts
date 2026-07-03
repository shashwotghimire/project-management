import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  addMemberToProjectSchema,
  createProjectSchema,
  deleteProjectSchema,
  getDashboardProjectsSchema,
  getProjectByIdSchema,
  getProjectMembersSchema,
  getUserProjectsSchema,
  removeProjectMemberSchema,
  updateProjectSchema,
  uploadProjectLogoSchema,
} from "../validations/projects.validation";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getDashboardProjects,
  getProjectById,
  getProjectMembers,
  getUserProjects,
  removeProjectMember,
  updateProject,
  uploadProjectLogo,
} from "../controllers/projects.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router({ mergeParams: true });

router.get(
  "/",
  authMiddleware,
  validate(getUserProjectsSchema),
  getUserProjects,
);

router.get(
  "/dashboard",
  authMiddleware,
  validate(getDashboardProjectsSchema),
  getDashboardProjects,
);
router.post("/", authMiddleware, validate(createProjectSchema), createProject);

router.get(
  "/:projectId",
  authMiddleware,
  validate(getProjectByIdSchema),
  getProjectById,
);

router.patch(
  "/:projectId",
  authMiddleware,
  validate(updateProjectSchema),
  updateProject,
);

router.delete(
  "/:projectId",
  authMiddleware,
  validate(deleteProjectSchema),
  deleteProject,
);

router.get(
  "/:projectId/members",
  authMiddleware,
  validate(getProjectMembersSchema),
  getProjectMembers,
);

router.post(
  "/:projectId/members",
  authMiddleware,
  validate(addMemberToProjectSchema),
  addMemberToProject,
);

router.delete(
  "/:projectId/members/:userId",
  authMiddleware,
  validate(removeProjectMemberSchema),
  removeProjectMember,
);

router.patch(
  "/:projectId/logo",
  authMiddleware,
  upload.single("file"),
  validate(uploadProjectLogoSchema),
  uploadProjectLogo,
);

export default router;
