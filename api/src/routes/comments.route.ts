import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentsByTaskSchema,
  updateCommentSchema,
} from "../validations/comments.validation";
import {
  createComment,
  deleteComment,
  getCommentsByTask,
  updateComment,
} from "../controllers/comments.controller";

const router = Router({ mergeParams: true });

router.get(
  "/",
  authMiddleware,
  validate(getCommentsByTaskSchema),
  getCommentsByTask,
);
router.post("/", authMiddleware, validate(createCommentSchema), createComment);
router.patch(
  "/:commentId",
  authMiddleware,
  validate(updateCommentSchema),
  updateComment,
);
router.delete(
  "/:commentId",
  authMiddleware,
  validate(deleteCommentSchema),
  deleteComment,
);

export default router;
