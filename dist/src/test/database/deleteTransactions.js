"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("../../configs/database.config"));
const transaction_model_1 = __importDefault(require("../../models/transaction.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const wallet_model_1 = __importDefault(require("../../models/wallet.model"));
const userId = "640c5fe8e4607df44520b092";
const walletId = "640c9a0c97321cead51393ca";
async function deleteTransactions() {
    await (0, database_config_1.default)();
    await transaction_model_1.default.deleteMany({
        userId: userId,
    }).then(() => {
        console.log("Transactions deleted successfully");
    });
    await user_model_1.default.updateOne({
        _id: userId,
    }, {
        $set: {
            transactions: [],
        },
    });
    await wallet_model_1.default.updateOne({
        _id: walletId,
    }, {
        $set: {
            transactions: [],
            balance: 0,
        },
    });
    process.exit(0);
}
deleteTransactions();
