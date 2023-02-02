import { userModel } from "@model";
import type { RequestHandler } from "express";

export const getAllUsers: RequestHandler = (_, res) => {
  res.json(userModel.users);
};
