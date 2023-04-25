import { userService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const updateUserById: RequestHandler = catchErrors(async (req, res) => {
  const updatedUser = await userService.update(req.params.id, req.body);

  res.status(200);
  res.json(updatedUser);
});
