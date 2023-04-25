
import { login } from "@controllers";
import { Router } from "express";

export const router = Router();

router.get("/login", login);