import { userModel } from "@model";
import type { RequestHandler } from "express";

export const getAllUsers: RequestHandler = (_, res) => {
  try {

    res.json(userModel.users);
  } catch (error) {
    res.status(500);
    res.send("Smoe thing went wrong")
  }
};
