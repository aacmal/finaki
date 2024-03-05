/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ACCESS_TOKEN_SECRET } from "../../index";
import UserModel from "../models/user.model";
// JWT middleware authentication
passport.use(new JwtStrategy({
    secretOrKey: ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async function (jwtPayload, done) {
    try {
        const user = await UserModel.findById(jwtPayload._id);
        if (!user) {
            return done(null, false, { message: "Something went wrong" });
        }
        return done(null, user._id);
    }
    catch (error) {
        return done(error, false, { message: "Something went wrong" });
    }
}));
