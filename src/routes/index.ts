import { Router } from "express";
import TransactionRoute from "./transaction.route";
import UserRoute from "./user.route";
import { isAuthenticated } from "../middlewares/authentication";
import AuthRouter from "./auth.router";
import WalletRoute from "./wallet.router";

const route = Router();

route.use("/auth", AuthRouter);
route.use("/user", isAuthenticated, UserRoute);
route.use("/wallet", isAuthenticated, WalletRoute);
route.use("/transaction", isAuthenticated, TransactionRoute);

const AppRoutes = route;
export default AppRoutes;
