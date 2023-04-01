import { Router } from "express";
import { router as userRouter } from "./user";
import { router as groupRouter } from "./group";
import { router as userGroupRouter } from "./user-group";

export const router = Router();

router.use("/user", userRouter);
router.use("/group", groupRouter);
router.use("/user-group", userGroupRouter);
