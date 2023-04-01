import { Router } from "express";
import { router as userRouter } from "./user";
import { router as groupRouter } from "./group";

export const router = Router();

router.use("/user", userRouter);
router.use("/group", groupRouter);
