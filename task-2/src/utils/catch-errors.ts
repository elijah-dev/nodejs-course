import type { NextFunction, RequestHandler, Request, Response } from "express";
import { CustomError } from "./custom-error";

export const catchErrors =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    Promise.resolve(fn(req, res, next)).catch((err) => {
      let message;

      if (err instanceof Error) {
        message = err.message;
      }

      if (typeof err === "string") {
        message = err;
      }

      next(new CustomError(400, message ?? "Something went wrong"));
    });
  };
