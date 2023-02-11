"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WalletController = __importStar(require("../controllers/wallet.controller"));
const validator_1 = require("../middlewares/validator");
const route = (0, express_1.Router)();
route.post("/", validator_1.walletValidator, WalletController.createWallet);
route.get("/", WalletController.getAllWallets);
route.put("/:id", validator_1.walletValidator, WalletController.updateWallet);
route.delete("/:id", validator_1.updateWalletValidator, WalletController.deleteWallet);
route.get("/:id", WalletController.getOneWallet);
route.post("/:id/transfer", validator_1.transferWalletBalanceValidator, WalletController.transferWalletBalance);
route.patch("/:id/color", validator_1.walletColorValidator, WalletController.updateWalletColor);
const WalletRoute = route;
exports.default = WalletRoute;
