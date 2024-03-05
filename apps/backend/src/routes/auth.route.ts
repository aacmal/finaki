import { Router } from "express";

import * as AuthController from "../controllers/auth.controller";
import {
  registerValidator,
  resetPasswordValidator,
  signValidator,
} from "../middlewares/validator";
import { forgotPasswordValidator } from "../middlewares/validator/forgotPassword.validator";

const router = Router();

router.post("/register", registerValidator, AuthController.register);
router.post("/sign", signValidator, AuthController.sign);
router.post("/login-with-google", AuthController.loginWithGoogle);
router.get("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  AuthController.forgotPassword,
);
router.get("/reset-password", AuthController.verifyResetPasswordToken);
router.post(
  "/reset-password",
  resetPasswordValidator,
  AuthController.resetPassword,
);

const AuthRouter = router;

export default AuthRouter;
