import { Router } from "express";
import * as UserController from "../controllers/user.controller";

const route = Router();

route.get("/", UserController.getUser);
route.get("/devices", UserController.getLoggedDevices);
route.post("/devices", UserController.logoutDevices);

const UserRoute = route;
export default UserRoute;
