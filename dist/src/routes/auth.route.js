"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController = __importStar(require("../controllers/auth.controller"));
const validator_1 = require("../middlewares/validator");
const forgotPassword_validator_1 = require("../middlewares/validator/forgotPassword.validator");
const router = (0, express_1.Router)();
router.post("/register", validator_1.registerValidator, AuthController.register);
router.post("/sign", validator_1.signValidator, AuthController.sign);
router.post("/login-with-google", AuthController.loginWithGoogle);
router.get("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);
router.post("/forgot-password", forgotPassword_validator_1.forgotPasswordValidator, AuthController.forgotPassword);
router.get("/reset-password", AuthController.verifyResetPasswordToken);
router.post("/reset-password", validator_1.resetPasswordValidator, AuthController.resetPassword);
const AuthRouter = router;
exports.default = AuthRouter;
