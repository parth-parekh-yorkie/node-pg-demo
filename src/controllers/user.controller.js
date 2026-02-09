import * as User from "../models/user.model.js";
import { HttpError } from "../middlewares/httpError.js";

export const createUser = async (req, res) => {
  const user = await User.createUser(req.body);
  res.status(201).json(user);
};

export const getUsers = async (_req, res) => {
  const users = await User.getAllUsers();
  res.json(users);
};

export const getUser = async (req, res) => {
  const user = await User.getUserById(Number(req.params.id));

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.json(user);
};
