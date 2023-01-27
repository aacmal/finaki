"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WalletSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    transactions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Wallet", WalletSchema);
