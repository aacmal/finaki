import { Router } from "express";
import TransactionRoute from "./transaction.route";
import UserRoute from "./user.route";
import { isAuthenticated } from "../middlewares/authentication";

const route = Router();

route.use("/transaction", isAuthenticated, TransactionRoute);
route.use("/user", UserRoute);

const AppRoutes = route;
export default AppRoutes;
