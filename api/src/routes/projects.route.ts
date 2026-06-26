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
} from "../controllers/projects.controller";

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

export default router;
