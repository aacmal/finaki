import { Router } from "express";
import * as WalletController from "../controllers/wallet.controller";
import { walletValidator } from "../middlewares/validator";

const route = Router();

route.get("/", WalletController.getAllWallets);
route.post("/create", walletValidator, WalletController.createWallet);
route.delete("/delete", WalletController.deleteWallet);

const WalletRoute = route;

export default WalletRoute;
