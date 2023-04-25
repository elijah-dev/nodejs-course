import { userService } from "@services";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export const initLocalStrategy = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const user = await userService.getByLogin(email);

        console.log(user);

        if (!user) {
          return done(new Error("User not found"), false);
        }

        if (user.password !== password) {
          return done(new Error("Wrong password"), false);
        }

        done(null, user);
      }
    )
  );
};
