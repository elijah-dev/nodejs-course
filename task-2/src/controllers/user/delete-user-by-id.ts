import { userService } from "@services";
import type { RequestHandler } from "express";

export const deleteUserById: RequestHandler = async (req, res) => {
  try {
    const user = await userService.delete(req.params.id);

    res.status(201);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
