import { userService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const getUserById: RequestHandler = catchErrors(async (req, res) => {
  const user = await userService.getById(req.params.id);

  res.status(200);
  res.json(user);
});
