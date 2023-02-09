import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { signValidator, registerValidator } from "../middlewares/validator";

const router = Router();

router.post("/register", registerValidator, AuthController.register);
router.post("/sign", signValidator, AuthController.sign);
router.get("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);

const AuthRouter = router;

export default AuthRouter;
