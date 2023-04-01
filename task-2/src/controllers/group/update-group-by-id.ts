import { groupService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const updateGroupById: RequestHandler = catchErrors(async (req, res) => {
  const updatedGroup = await groupService.update(req.params.id, req.body);

  res.status(201);
  res.json(updatedGroup);
});
