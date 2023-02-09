"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("@middlewares/authentication");
const transaction_route_1 = __importDefault(require("./transaction.route"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const wallet_route_1 = __importDefault(require("./wallet.route"));
const route = (0, express_1.Router)();
route.use("/auth", auth_route_1.default);
route.use("/user", authentication_1.isAuthenticated, user_route_1.default);
route.use("/wallets", authentication_1.isAuthenticated, wallet_route_1.default);
route.use("/transaction", authentication_1.isAuthenticated, transaction_route_1.default);
exports.default = route;
