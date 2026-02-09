import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserSchema,
  userIdParamSchema,
} from "../validators/user.schema.js";
import {
  createUser,
  getUsers,
  getUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post(
  "/",
  validate({ body: createUserSchema }),
  asyncHandler(createUser),
);

router.get("/", asyncHandler(getUsers));

router.get(
  "/:id",
  validate({ params: userIdParamSchema }),
  asyncHandler(getUser),
);

export default router;
