
import { userModel } from "@model";
import type { RequestHandler } from "express";

export const updateUserById: RequestHandler = (req, res) => {
  try {
    const updatedUser = userModel.updateById(req.params.id, req.body);

    res.status(201);
    res.json(updatedUser);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};
