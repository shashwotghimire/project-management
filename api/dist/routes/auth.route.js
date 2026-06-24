"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_validation_1 = require("../validations/auth.validation");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", (0, validation_middleware_1.validate)(auth_validation_1.registerUserSchema), auth_controller_1.registerUser);
router.post("/login", (0, validation_middleware_1.validate)(auth_validation_1.loginUserSchema), auth_controller_1.loginUser);
router.get("/verify-email", (0, validation_middleware_1.validate)(auth_validation_1.verifyEmailSchema), auth_controller_1.verifyEmail);
router.get("/me", auth_middleware_1.authMiddleware, auth_controller_1.getUserProfile);
exports.default = router;
//# sourceMappingURL=auth.route.js.map