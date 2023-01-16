import express from "express";
import * as UserController from "../controllers/user.controller";
import { userValidator } from "../middlewares/validator";

const route = express.Router();

route.post("/register", userValidator, UserController.createUser);
route.post("/login", userValidator, UserController.login);

const UserRoute = route;
export default UserRoute;
