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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.create = exports.getById = exports.pullTransaction = exports.pushTransaction = void 0;
const Wallet_1 = __importDefault(require("../models/Wallet"));
const UserService = __importStar(require("./user.service"));
async function pushTransaction(walletId, transactionId, amount) {
    try {
        if (!walletId)
            return;
        await Wallet_1.default.findByIdAndUpdate({
            _id: walletId,
        }, {
            $push: {
                transactions: transactionId,
            },
            $inc: {
                balance: amount,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.pushTransaction = pushTransaction;
async function pullTransaction(walletId, transactionId, amount) {
    try {
        if (!walletId)
            return;
        await Wallet_1.default.findByIdAndUpdate({
            _id: walletId,
        }, {
            $pull: {
                transactions: transactionId,
            },
            $inc: {
                balance: -amount,
            },
        }, {
            new: true,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.pullTransaction = pullTransaction;
async function getById(walletId) {
    try {
        return await Wallet_1.default.findById(walletId);
    }
    catch (error) {
        throw error;
    }
}
exports.getById = getById;
async function create(walletData) {
    try {
        const wallet = new Wallet_1.default(walletData);
        const savedWallet = await wallet.save();
        await UserService.pushWallet(walletData.userId, savedWallet._id);
        return savedWallet;
    }
    catch (error) {
        throw error;
    }
}
exports.create = create;
async function deleteById(walletId) {
    try {
        const wallet = await Wallet_1.default.findById(walletId);
        if (!wallet)
            return;
        await UserService.pullWallet(wallet.userId, walletId);
        return await wallet.remove();
    }
    catch (error) {
        throw error;
    }
}
exports.deleteById = deleteById;
// export async function increseBalance(walletId: Types.ObjectId, amount: number) {
//   try {
//     const wallet = await Wallet.findById(walletId);
//     if (wallet) {
//       wallet.balance += amount;
//       await wallet.save();
//     }
//   } catch (error) {
//     throw error;
//   }
// }
// export async function decreaseBalance(walletId: Types.ObjectId, amount: number) {
//   try {
//     const wallet = await Wallet.findById(walletId);
//     if (wallet) {
//       wallet.balance -= amount;
//       await wallet.save();
//     }
//   } catch (error) {
//     throw error;
//   }
// }
