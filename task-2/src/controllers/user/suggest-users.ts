import { userModel } from "@model";
import type { RequestHandler } from "express";

export const suggestUsers: RequestHandler = (req, res) => {
  try {
    const results = userModel.suggest(req.query);

    res.status(201);
    res.json(results);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};
