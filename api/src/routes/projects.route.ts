import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  addMemberToProjectSchema,
  createProjectSchema,
  deleteProjectSchema,
  getUserProjectsSchema,
  updateProjectSchema,
} from "../validations/projects.validation";
import {
  addMemberToProject,
  createProject,
  deleteProject,
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
router.post(
  "/:projectId/members",
  authMiddleware,
  validate(addMemberToProjectSchema),
  addMemberToProject,
);
export default router;
