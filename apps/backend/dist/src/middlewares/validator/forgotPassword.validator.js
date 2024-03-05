/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { body } from "express-validator";
import userModel from "../../models/user.model";
export const forgotPasswordValidator = [
    body("email")
        .isEmail()
        .withMessage("Email is invalid")
        .notEmpty()
        .withMessage("Email is required")
        .custom(async (value) => {
        // check if email is registered
        const user = await userModel.findOne({ email: value });
        if (!user) {
            throw new Error("Email tidak terdaftar");
        }
    }),
];
