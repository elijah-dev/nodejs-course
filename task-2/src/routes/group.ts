import {
  createGroup,
  deleteGroupById,
  getAllGroups,
  getGroupById,
  updateGroupById,
} from "@controllers";
import { Router } from "express";

export const router = Router();

router.get("/", getAllGroups);

router.post("/create", createGroup);

router
  .route("/:id")
  .get(getGroupById)
  .put(updateGroupById)
  .delete(deleteGroupById);
