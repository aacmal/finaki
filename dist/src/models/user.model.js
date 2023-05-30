"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    resetPasswordToken: {
        type: String,
        required: false,
        default: null,
    },
    telegramAccount: {
        // type: String,
        // index: true,
        // unique: true,
        // sparse: true
        id: {
            type: String,
            required: false,
            unique: true,
            index: true,
            sparse: true,
        },
        username: {
            type: String,
            required: false,
        },
        first_name: {
            type: String,
            required: false,
        },
    },
    refreshTokens: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "RefreshToken",
        },
    ],
    wallets: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Wallet",
        },
    ],
    transactions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
}, { timestamps: true });
exports.UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const hash = await bcrypt_1.default.hash(this.password, 10);
    this.password = hash;
    next();
});
// UserSchema.methods.isValidPassword = async function (password: string) {
//   const compare = await bcrypt.compare(password, this.password);
//   return compare;
// };
exports.default = mongoose_1.default.model("User", exports.UserSchema);
