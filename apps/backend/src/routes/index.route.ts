import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import AuthRouter from "./auth.route";
import TransactionRoute from "./transaction.route";
import UserRoute from "./user.route";
import WalletRoute from "./wallet.route";

const route = Router();

route.use("/auth", AuthRouter);
route.use("/user", isAuthenticated, UserRoute);
route.use("/wallets", isAuthenticated, WalletRoute);
route.use("/transactions", isAuthenticated, TransactionRoute);

export default route;
