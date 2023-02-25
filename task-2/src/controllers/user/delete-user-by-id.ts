import { userModel } from "@model";
import type { RequestHandler } from "express";

export const deleteUserById: RequestHandler = (req, res) => {
  try {
    const user = userModel.softDelete(req.params.id);

    res.status(201);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
