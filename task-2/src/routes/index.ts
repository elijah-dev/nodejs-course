import { Router } from "express";
import { router as userRouter } from "./user";
import { router as groupRouter } from "./group";
import { router as userGroupRouter } from "./user-group";

export { router as authRouter } from "./auth";

export const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/group", groupRouter);
apiRouter.use("/user-group", userGroupRouter);
