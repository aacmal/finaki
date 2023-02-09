import { Router } from "express";
import * as WalletController from "../controllers/wallet.controller";
import { updateWalletValidator, walletColorValidator, walletValidator } from "../middlewares/validator";

const route = Router();

route.post("/", walletValidator, WalletController.createWallet);
route.get("/", WalletController.getAllWallets);
route.put("/:id", walletValidator, WalletController.updateWallet);
route.delete("/:id", updateWalletValidator, WalletController.deleteWallet);
route.get("/:id", WalletController.getOneWallet);
route.patch("/:id/color", walletColorValidator, WalletController.updateWalletColor);

const WalletRoute = route;

export default WalletRoute;
