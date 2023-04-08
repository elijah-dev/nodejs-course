import { addUserToGroup } from "@controllers/user-group/add user-to-group";
import { Router } from "express";

export const router = Router();

router.post("/add-user-to-group", addUserToGroup);

