"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const invitation_validation_1 = require("../validations/invitation.validation");
const invitation_controller_1 = require("../controllers/invitation.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(invitation_validation_1.createInvitationSchema), invitation_controller_1.createInvitation);
router.post("/respond", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(invitation_validation_1.respondToInvitationSchema), invitation_controller_1.respondToInvitation);
exports.default = router;
//# sourceMappingURL=invitation.route.js.map