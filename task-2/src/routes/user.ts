import { createUser, getAllUsers } from "@controllers";
import { deleteUserById } from "@controllers/user/delete-user-by-id";
import { getUserById } from "@controllers/user/get-user-by-id";
import { suggestUsers } from "@controllers/user/suggest-users";
import { updateUserById } from "@controllers/user/update-user-by-id";
import { Router } from "express";

export const router = Router();

router.get("/", getAllUsers);

router.post("/create", createUser);

router.get("/suggest", suggestUsers);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);
