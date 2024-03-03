"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordValidator = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../../models/user.model"));
exports.forgotPasswordValidator = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email is invalid")
        .notEmpty()
        .withMessage("Email is required")
        .custom(async (value) => {
        // check if email is registered
        const user = await user_model_1.default.findOne({ email: value });
        if (!user) {
            throw new Error("Email tidak terdaftar");
        }
    }),
];
