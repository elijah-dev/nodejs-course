import { userService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const createUser: RequestHandler = catchErrors(async (req, res) => {
  const newUser = await userService.create(req.body);

  res.status(201);
  res.json(newUser);
});
