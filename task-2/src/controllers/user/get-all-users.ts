import { userService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const getAllUsers: RequestHandler = catchErrors(async (_, res) => {
  const users = await userService.getAll();

  res.json(users);
});
