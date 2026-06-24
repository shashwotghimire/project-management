"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const comments_validation_1 = require("../validations/comments.validation");
const comments_controller_1 = require("../controllers/comments.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.get("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(comments_validation_1.getCommentsByTaskSchema), comments_controller_1.getCommentsByTask);
router.post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(comments_validation_1.createCommentSchema), comments_controller_1.createComment);
router.patch("/:commentId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(comments_validation_1.updateCommentSchema), comments_controller_1.updateComment);
router.delete("/:commentId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validate)(comments_validation_1.deleteCommentSchema), comments_controller_1.deleteComment);
exports.default = router;
//# sourceMappingURL=comments.route.js.map