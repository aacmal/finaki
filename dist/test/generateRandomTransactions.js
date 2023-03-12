"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("configs/database.config"));
async function generateRandomTransactions() {
    await (0, database_config_1.default)();
    console.count("Database connected");
}
generateRandomTransactions();
