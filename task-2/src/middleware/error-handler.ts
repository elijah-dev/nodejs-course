import { logger } from "@loggers";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log("handle errors");
  
  logger.error(err);

  res
    .status(err.status ?? 500)
    .json({ message: (err.message as string) ?? "Something went wrong" });
};
