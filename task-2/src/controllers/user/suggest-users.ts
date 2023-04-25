import { userService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const suggestUsers: RequestHandler = catchErrors(async (req, res) => {
  const results = await userService.suggest(req.query);

  res.status(200);
  res.json(results);
});
