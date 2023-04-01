import { groupService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const getGroupById: RequestHandler = catchErrors(async (req, res) => {
  const group = await groupService.getById(req.params.id);

  res.status(201);
  res.json(group);
});
