import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User";
import { compare } from "bcrypt";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isPassowrdValid = await compare(password, user.password);

        if (!isPassowrdValid) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      secretOrKey: JWT_SECRET!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (jwtPayload, done) {
      try {
        const user = await User.findById(jwtPayload._id);
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
