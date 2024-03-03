"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.WalletSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        min: [0, "Balance cannot be negative"],
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    transactions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
    isCredit: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Wallet", exports.WalletSchema);