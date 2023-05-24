import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import {
  signValidator,
  registerValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../middlewares/validator";

const router = Router();

router.post("/register", registerValidator, AuthController.register);
router.post("/sign", signValidator, AuthController.sign);
router.get("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);
router.post("/forgot-password", forgotPasswordValidator, AuthController.forgotPassword);
router.get("/reset-password", AuthController.verifyResetPasswordToken);
router.post("/reset-password", resetPasswordValidator, AuthController.resetPassword);

const AuthRouter = router;

export default AuthRouter;
