"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const passport_1 = __importDefault(require("passport"));
function isAuthenticated(req, res, next) {
    passport_1.default.authenticate("jwt", { session: false }, (error, userId, info) => {
        if (error || !userId) {
            return res.status(401).json({
                message: info.message,
            });
        }
        else {
            req.user = userId;
            next();
        }
    })(req, res, next);
}
exports.isAuthenticated = isAuthenticated;
