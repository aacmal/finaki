"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../models/User"));
const passport_jwt_1 = require("passport-jwt");
const __1 = require("../..");
// JWT middleware authentication
passport_1.default.use(new passport_jwt_1.Strategy({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    secretOrKey: __1.ACCESS_TOKEN_SECRET,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async function (jwtPayload, done) {
    try {
        const user = await User_1.default.findById(jwtPayload._id);
        if (!user) {
            return done(null, false, { message: "Something went wrong" });
        }
        return done(null, user._id);
    }
    catch (error) {
        return done(error, false, { message: "Something went wrong" });
    }
}));
