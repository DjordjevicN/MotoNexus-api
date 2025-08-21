import { Router } from "express";

import { validate } from "../middleware/validate.js";
import { asyncH } from "../utils/asyncH.js";
import {
  UserCreateSchema,
  UserUpdateSchema,
  UserIdParamSchema,
} from "../schemas/user.schema.js";
import * as UserController from "../controllers/user.controller.js";

const r = Router();

r.post(
  "/",
  validate(UserCreateSchema, ["body"]),
  asyncH(UserController.createUser)
);
r.get("/", asyncH(UserController.getUsers));
r.get(
  "/:id",
  validate(UserIdParamSchema, ["params"]),
  asyncH(UserController.getUserById)
);
r.post("/login", asyncH(UserController.loginUser));
r.patch(
  "/:id",
  validate(UserUpdateSchema, ["params", "body"]),
  asyncH(UserController.updateUser)
);
r.delete(
  "/:id",
  validate(UserIdParamSchema, ["params"]),
  asyncH(UserController.deleteUser)
);

export default r;
