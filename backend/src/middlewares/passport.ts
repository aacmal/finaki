import passport from "passport";
import UserModel from "../models/user.model";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { ACCESS_TOKEN_SECRET } from "../..";

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
