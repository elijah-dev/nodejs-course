import { userService } from "@services";
import type { RequestHandler } from "express";

export const suggestUsers: RequestHandler = async (req, res) => {
  try {
    const results = await userService.suggest(req.query);

    res.status(201);
    res.json(results);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};
