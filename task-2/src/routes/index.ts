import { Router } from "express";
import { router as userRouter } from "./user";

export const router = Router();

router.use("/user", userRouter);
