import { keyProvider } from "@providers";
import { userService } from "@services";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

export const initJwtStrategy = () => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: keyProvider.jwtSecret,
      },
      async (jwtPayload, done) => {
        const user = await userService.getById(jwtPayload.id);

        if (!user) {
          return done(new Error("User not found"), false);
        }

        done(null, user);
      }
    )
  );
};
