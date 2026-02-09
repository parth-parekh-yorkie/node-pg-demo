import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { createPostSchema } from "../validators/posts.schema.js";
import * as controller from "../controllers/post.controller.js";

const router = Router();

router.post(
  "/",
  validate({ body: createPostSchema }),
  asyncHandler(controller.createPost),
);

router.get("/", asyncHandler(controller.getPosts));

export default router;
