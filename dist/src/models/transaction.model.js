"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.TransactionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    walletId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Wallet",
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["in", "out"],
        required: true,
    },
    includeInCalculation: {
        type: Boolean,
        required: false,
        default: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Transaction", exports.TransactionSchema);
