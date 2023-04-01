
import { groupService } from "@services";
import { catchErrors } from "@utils";
import type { RequestHandler } from "express";

export const getAllGroups: RequestHandler = catchErrors(async (_, res) => {
  const groups = await groupService.getAll();

  res.json(groups);
});
