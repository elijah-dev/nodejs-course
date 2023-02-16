import { userService } from "@services";
import type { RequestHandler } from "express";

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);

    res.status(201);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
