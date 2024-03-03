import { Router } from "express";
import * as WalletController from "../controllers/wallet.controller";
import { transferWalletBalanceValidator, updateWalletValidator, walletColorValidator } from "../middlewares/validator";
import { walletValidator } from "../middlewares/validator/wallet.validator";

const route = Router();

route.post("/", walletValidator, WalletController.createWallet);
route.get("/", WalletController.getAllWallets);
route.post("/transfer-balance", transferWalletBalanceValidator, WalletController.transferWalletBalance);
route.post("/reorder", WalletController.reorderWallets);
route.put("/:id", walletValidator, WalletController.updateWallet);
route.delete("/:id", updateWalletValidator, WalletController.deleteWallet);
route.get("/:id", WalletController.getOneWallet);
route.get("/:id/transactions", WalletController.walletTransactions);
route.patch("/:id/color", walletColorValidator, WalletController.updateWalletColor);

const WalletRoute = route;

export default WalletRoute;
