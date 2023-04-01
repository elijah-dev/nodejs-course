
import { userGroupService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const addUserToGroup: RequestHandler = catchErrors(async (req, res) => {
  const response = await userGroupService.addUserToGroup(req.body);

  res.status(201);
  res.json(response);
});
