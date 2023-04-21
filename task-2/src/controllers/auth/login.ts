import passport from "passport";
import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import { CustomError, catchErrors } from "@utils";
import type { User } from "@model/user";
import { keyProvider } from "@providers";

export const login: RequestHandler = catchErrors((req, res, next) => {
  const middleware = passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: User) => {
      if (err) {
        return next(new CustomError(401, err.message ?? "User not found"));
      }

      req.login(user, { session: false }, (error) => {
        if (error) {
          return next(new CustomError(500, error.message ?? "Login failed"))
        }

        const token = jwt.sign({ ...user }, keyProvider.jwtSecret);
        res.json({ token });
      });
    }
  ) as RequestHandler;

  middleware(req, res, next);
});
