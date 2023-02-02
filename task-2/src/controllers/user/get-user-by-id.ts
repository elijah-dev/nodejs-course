import { userModel } from "@model";
import type { RequestHandler } from "express";

export const getUserById: RequestHandler = (req, res) => {
  try {
    const user = userModel.getById(req.params.id);

    res.status(201);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};
