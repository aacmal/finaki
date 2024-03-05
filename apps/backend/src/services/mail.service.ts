import dotenv from "dotenv";
import nodemailer from "nodemailer";

import resetPasswordTemplate from "../template/reset-password";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendForgotPasswordToken(email: string, token: string) {
  try {
    const redirectLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: resetPasswordTemplate(redirectLink),
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}
