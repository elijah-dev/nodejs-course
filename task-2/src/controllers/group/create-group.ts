import { groupService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const createGroup: RequestHandler = catchErrors(async (req, res) => {
  const newGroup = await groupService.create(req.body);

  res.status(201);
  res.json(newGroup);
});