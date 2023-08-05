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
/* eslint-disable @typescript-eslint/no-explicit-any */
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const TransactionService = __importStar(require("./transaction.service"));
const Transaction_1 = require("../interfaces/Transaction");
const transaction_scene_1 = require("./bot/transaction.scene");
const filters_1 = require("telegraf/filters");
dotenv_1.default.config();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const bot = new telegraf_1.Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(telegraf_1.Telegraf.log());
const currentUser = async (messageId) => {
    const user = await user_model_1.default.findOne({ "telegramAccount.id": messageId });
    if (!user) {
        throw new Error("Akun telegram ini belum terhubung, paste token kamu untuk menghubungkan");
    }
    return user;
};
bot.start((ctx) => {
    ctx.reply("Selamat datang di bot Finaki - Money Manager \nBot ini akan membantu kamu dalam mengelola keuangan kamu");
    ctx.reply("Silahkan ketik /help untuk melihat daftar perintah");
    ctx.reply("Masukan token kamu untuk memulai");
});
bot.help((ctx) => {
    ctx.reply("Daftar perintah yang tersedia: \n /help \n /start \n /token \n /in \n /out \n /balance");
});
bot.command("/user", async (ctx) => {
    try {
        const user = await user_model_1.default.findOne({
            "telegramAccount.id": ctx.message.from.id,
        });
        if (!user) {
            ctx.reply("Akun telegram ini belum terhubung, ketik /token untuk menghubungkan");
            return;
        }
        ctx.reply(`Akun telegram ini terhubung dengan token ${user.token}`);
    }
    catch (error) {
        ctx.reply("Ada yang salah", error.message);
    }
});
bot.command("/in", async (ctx) => {
    var _a, _b, _c;
    try {
        // console.log(ctx.message)
        const description = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text.split("#")[0].replace("/in ", "");
        const amount = (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.text.split("#")[1];
        const walletName = (_c = ctx.message) === null || _c === void 0 ? void 0 : _c.text.split("#")[2];
        if (!description || !amount) {
            ctx.reply("Perintah tidak lengkap \nFormat: /in <deskripsi>#<nominal>#<nama_dompet> \nContoh: /in Gaji#1000000#Dompet Utama");
            return;
        }
        const user = await user_model_1.default.findOne({
            "telegramAccount.id": ctx.message.from.id,
        }).populate("wallets");
        if (!user) {
            ctx.reply("Akun telegram ini belum terhubung, ketik /token untuk menghubungkan");
            return;
        }
        const wallet = user.wallets.find((wallet) => wallet.name === walletName);
        if (!wallet && walletName) {
            ctx.reply("Dompet tidak ditemukan");
            return;
        }
        const transaction = {
            userId: user._id,
            description,
            amount,
            note: "Created in Telegram Bot",
            type: Transaction_1.TransactionType.IN,
            includeInCalculation: true,
            walletId: walletName ? wallet._id : undefined,
        };
        const createdTransaction = await TransactionService.create(transaction);
        ctx.reply(`Transaksi berhasil dibuat \nDeskripsi: ${createdTransaction.description} \nNominal: Rp ${createdTransaction.amount} \nTipe Transaksi: Masuk \nDompet: ${walletName ? walletName : ""}`);
    }
    catch (error) {
        ctx.reply(error);
    }
});
bot.command("/out", async (ctx) => {
    var _a, _b, _c;
    try {
        // console.log(ctx.message)
        const description = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text.split("#")[0].replace("/out ", "");
        const amount = (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.text.split("#")[1];
        const walletName = (_c = ctx.message) === null || _c === void 0 ? void 0 : _c.text.split("#")[2];
        if (!description || !amount) {
            ctx.reply("Perintah tidak lengkap \nFormat: /out <deskripsi>#<nominal>#<nama_dompet> \nContoh: /in Gaji#1000000#Dompet Utama");
            return;
        }
        const user = await user_model_1.default.findOne({
            "telegramAccount.id": ctx.message.from.id,
        }).populate("wallets");
        if (!user) {
            ctx.reply("Akun telegram ini belum terhubung, ketik /token untuk menghubungkan");
            return;
        }
        const wallet = user.wallets.find((wallet) => wallet.name === walletName);
        if (!wallet && walletName) {
            ctx.reply("Dompet tidak ditemukan");
            return;
        }
        if (wallet.balance < amount) {
            ctx.reply("Saldo dompet tidak mencukupi");
            return;
        }
        const transaction = {
            userId: user._id,
            description,
            amount,
            type: Transaction_1.TransactionType.OUT,
            note: "",
            includeInCalculation: true,
            walletId: walletName ? wallet._id : undefined,
        };
        const createdTransaction = await TransactionService.create(transaction);
        ctx.reply(`Transaksi berhasil dibuat \nDeskripsi: ${createdTransaction.description} \nNominal: Rp ${createdTransaction.amount} \nTipe Transaksi: Keluar \nDompet: ${walletName ? walletName : ""}`);
    }
    catch (error) {
        ctx.reply("Ada Yang salah ", error.message);
    }
});
bot.command("/balance", async (ctx) => {
    var _a;
    try {
        const walletName = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text.split("#")[1];
        if (!walletName) {
            ctx.reply("Perintah tidak lengkap \nFormat: /balance#<nama_dompet> \nContoh: /balance Dompet Utama");
            return;
        }
        const user = await user_model_1.default.findOne({
            "telegramAccount.id": ctx.message.from.id,
        }).populate("wallets");
        if (!user) {
            ctx.reply("Akun telegram ini belum terhubung, ketik /token untuk menghubungkan");
            return;
        }
        const wallet = user.wallets.find((wallet) => wallet.name === walletName);
        if (!wallet) {
            ctx.reply("Dompet tidak ditemukan");
            return;
        }
        ctx.reply(`Saldo dompet ${wallet.name} adalah Rp ${wallet.balance}`);
    }
    catch (error) {
        ctx.reply("Ada Yang salah ", error.message);
    }
});
// middleware: authenticate user
bot.use(async (ctx, next) => {
    if (!ctx.message) {
        return;
    }
    try {
        ctx.state.user = await currentUser(ctx.message.from.id);
        return next();
    }
    catch (error) {
        ctx.reply(error.message);
    }
});
bot.use((0, telegraf_1.session)());
bot.use(transaction_scene_1.transactionStage.middleware());
bot.command("add", (ctx) => {
    ctx.scene.enter("new-transaction");
});
// connect telegram account to user
bot.on((0, filters_1.message)("text"), async (ctx) => {
    const message = ctx.message.text;
    if (message.length !== 20) {
        ctx.reply("Harap masukan sesuai format periintah");
        return;
    }
    try {
        const user = await user_model_1.default.findOneAndUpdate({ token: message }, {
            telegramAccount: {
                id: ctx.message.from.id,
                username: ctx.message.from.username,
                first_name: ctx.message.from.first_name,
            },
        });
        if (!user) {
            ctx.reply("Token belum terdaftar");
            return;
        }
        ctx.reply("Akun telegram berhasil terhubung, ketik /menu untuk melihat daftar perintah");
    }
    catch (error) {
        ctx.reply("Gagal menghubungkan \nAkun telegram ini sudah terhubung dengan token lain, putuskan terlebih dahulu di akun web kamu");
    }
});
bot.catch((err, ctx) => {
    ctx.reply("Ooops, terjadi kesalahan");
    console.log(err);
});
exports.default = bot;
