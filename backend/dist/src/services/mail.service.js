"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForgotPasswordToken = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const reset_password_1 = __importDefault(require("../template/reset-password"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
async function sendForgotPasswordToken(email, token) {
    try {
        const redirectLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Password",
            html: (0, reset_password_1.default)(redirectLink),
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw error;
    }
}
exports.sendForgotPasswordToken = sendForgotPasswordToken;
