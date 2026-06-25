"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const projects_validation_1 = require("../validations/projects.validation");
const projects_controller_1 = require("../controllers/projects.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.get("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(projects_validation_1.getUserProjectsSchema), projects_controller_1.getUserProjects);
router.post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(projects_validation_1.createProjectSchema), projects_controller_1.createProject);
router.get("/:projectId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(projects_validation_1.getProjectByIdSchema), projects_controller_1.getProjectById);
router.patch("/:projectId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(projects_validation_1.updateProjectSchema), projects_controller_1.updateProject);
router.delete("/:projectId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(projects_validation_1.deleteProjectSchema), projects_controller_1.deleteProject);
router.get("/:projectId/members", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(projects_validation_1.getProjectMembersSchema), projects_controller_1.getProjectMembers);
router.post("/:projectId/members", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(projects_validation_1.addMemberToProjectSchema), projects_controller_1.addMemberToProject);
router.delete("/:projectId/members/:userId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(projects_validation_1.removeProjectMemberSchema), projects_controller_1.removeProjectMember);
exports.default = router;
//# sourceMappingURL=projects.route.js.map