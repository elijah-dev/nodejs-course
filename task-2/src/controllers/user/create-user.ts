import { userModel } from "@model";
import type { RequestHandler } from "express";

export const createUser: RequestHandler = (req, res) => {
  try {
    const newUser = userModel.create(req.body);

    res.status(201);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};
