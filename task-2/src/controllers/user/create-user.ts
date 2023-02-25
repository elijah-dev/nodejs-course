import { userService } from "@services";
import type { RequestHandler } from "express";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const newUser = await userService.create(req.body);

    res.status(201);
    res.json(newUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
