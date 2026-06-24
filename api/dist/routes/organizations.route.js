"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organizations_controller_1 = require("../controllers/organizations.controller");
const tasks_controller_1 = require("../controllers/tasks.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const organizations_validation_1 = require("../validations/organizations.validation");
const tasks_validation_1 = require("../validations/tasks.validation");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(organizations_validation_1.createOrganizationSchema), organizations_controller_1.createOrganizaiton);
router.get("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(organizations_validation_1.getUsersOrganizationsSchema), organizations_controller_1.getUsersOrganizations);
router.get("/:orgId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(organizations_validation_1.getOrgByIdSchema), organizations_controller_1.getOrgById);
router.patch("/:orgId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(organizations_validation_1.updateOrganizationSchema), organizations_controller_1.updateOrganization);
router.delete("/:orgId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(organizations_validation_1.deleteOrganizationSchema), organizations_controller_1.deleteOrganization);
router.get("/:orgId/members", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(organizations_validation_1.getAllMembersOfOrgSchema), organizations_controller_1.getAllMembersOfOrg);
router.get("/:orgId/my-tasks", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(tasks_validation_1.getTasksAssignedToUserSchema), tasks_controller_1.getTasksAssignedToUser);
exports.default = router;
//# sourceMappingURL=organizations.route.js.map