"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_route_1 = __importDefault(require("./transaction.route"));
const user_route_1 = __importDefault(require("./user.route"));
const authentication_1 = require("../middlewares/authentication");
const auth_router_1 = __importDefault(require("./auth.router"));
const wallet_router_1 = __importDefault(require("./wallet.router"));
const route = (0, express_1.Router)();
route.use("/auth", auth_router_1.default);
route.use("/user", authentication_1.isAuthenticated, user_route_1.default);
route.use("/wallet", authentication_1.isAuthenticated, wallet_router_1.default);
route.use("/transaction", authentication_1.isAuthenticated, transaction_route_1.default);
const AppRoutes = route;
exports.default = AppRoutes;
