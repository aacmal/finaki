import express, { Router } from "express";
import * as UserController from "../controllers/user.controller";
import { userValidator } from "../middlewares/validator";
import { isAuthenticated } from "../middlewares/authentication";

const route = express.Router();

route.post("/register", userValidator, UserController.createUser);
route.post("/login", userValidator, UserController.login);
route.get("/", isAuthenticated, UserController.getUser);

const UserRoute = route;
export default UserRoute;
