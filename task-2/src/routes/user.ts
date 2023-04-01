import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  suggestUsers,
  updateUserById,
} from "@controllers";
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
