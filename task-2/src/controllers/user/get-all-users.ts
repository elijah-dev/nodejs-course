import { userService } from "@services";
import type { RequestHandler } from "express";

export const getAllUsers: RequestHandler = async (_, res) => {
  try {
    const users = await userService.getAll();

    res.json(users);
  } catch (error) {
    console.log(error);
    
    res.status(500);
    res.json("Something went wrong")
  }
};
