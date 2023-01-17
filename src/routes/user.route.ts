import { Router } from "express";
import * as UserController from "../controllers/user.controller";

const route = Router();

route.get("/", UserController.getUser);

const UserRoute = route;
export default UserRoute;
