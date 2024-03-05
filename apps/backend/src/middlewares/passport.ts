import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { ACCESS_TOKEN_SECRET } from "../..";
import UserModel from "../models/user.model";

// JWT middleware authentication
passport.use(
  new JwtStrategy(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secretOrKey: ACCESS_TOKEN_SECRET!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (jwtPayload, done) {
      try {
        const user = await UserModel.findById(jwtPayload._id);
        if (!user) {
          return done(null, false, { message: "Something went wrong" });
        }
        return done(null, user._id);
      } catch (error) {
        return done(error, false, { message: "Something went wrong" });
      }
    },
  ),
);
