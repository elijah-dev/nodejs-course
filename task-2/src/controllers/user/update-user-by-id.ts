
import { userService } from "@services";
import type { RequestHandler } from "express";

export const updateUserById: RequestHandler = async (req, res) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);

    res.status(201);
    res.json(updatedUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
