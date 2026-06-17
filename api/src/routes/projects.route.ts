import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  addMemberToProjectSchema,
  createProjectSchema,
  deleteProjectSchema,
  getProjectMembersSchema,
  getUserProjectsSchema,
  updateProjectSchema,
} from "../validations/projects.validation";
import {
  addMemberToProject,
  createProject,
  deleteProject,
  getProjectMembers,
  getUserProjects,
  updateProject,
} from "../controllers/projects.controller";

const router = Router({ mergeParams: true });

router.get(
  "/",
  authMiddleware,
  validate(getUserProjectsSchema),
  getUserProjects,
);
router.post("/", authMiddleware, validate(createProjectSchema), createProject);

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

export default router;
