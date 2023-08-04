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
exports.transactionStage = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const telegraf_1 = require("telegraf");
const wallet_model_1 = __importDefault(require("../../models/wallet.model"));
const Transaction_1 = require("../../interfaces/Transaction");
const TransactionService = __importStar(require("../../services/transaction.service"));
const { WizardScene, Stage } = telegraf_1.Scenes;
const addTransactionWizard = new WizardScene("new-transaction", 
// step 0: ask for name
(ctx) => {
    ctx.session.__scenes.state = {};
    ctx.reply("Ketikan nama transaksi", telegraf_1.Markup.removeKeyboard());
    return ctx.wizard.next();
}, 
// step 1: ask for amount
(ctx) => {
    ctx.session.__scenes.state.name = ctx.message.text;
    ctx.reply("Ketikan nominal transaksi");
    return ctx.wizard.next();
}, 
// step 2: validate amount and ask for type
(ctx) => {
    const amount = ctx.message.text;
    if (isNaN(amount)) {
        ctx.reply("Jumlah transaksi harus angka, silahkan ulangi");
        return ctx.wizard.selectStep(2);
    }
    ctx.session.__scenes.state.amount = ctx.message.text;
    ctx.reply("Pilih Jenis Transaksi", telegraf_1.Markup.keyboard([["⬆️ Masuk", "⬇️ Keluar"]])
        .oneTime()
        .resize());
    return ctx.wizard.next();
}, 
// step 3: validate type and ask for wallet
(ctx) => {
    const response = ctx.message.text;
    let type;
    if (response !== "⬆️ Masuk" && response !== "⬇️ Keluar") {
        ctx.reply("Pilih salah satu jenis transaksi", telegraf_1.Markup.keyboard([
            ["⬆️ Masuk", "⬇️ Keluar"], // Row1 with 2 buttons
        ])
            .oneTime()
            .resize());
        return ctx.wizard.selectStep(3);
    }
    if (response === "⬆️ Masuk") {
        type = Transaction_1.TransactionType.IN;
    }
    else {
        type = Transaction_1.TransactionType.OUT;
    }
    ctx.session.__scenes.state.type = type;
    ctx.reply("Apakah anda ingin memilih dompet?", telegraf_1.Markup.keyboard(["Ya", "Tidak"]).resize().oneTime());
    return ctx.wizard.next();
}, 
//  step 4: validate confirmation and choose wallet or save without wallet
async (ctx) => {
    const response = ctx.message.text;
    const userId = ctx.state.user._id;
    const { type: transactionType, amount } = ctx.session.__scenes.state;
    if (response !== "Ya" && response !== "Tidak") {
        ctx.reply("Pilih salah satu", telegraf_1.Markup.keyboard(["Ya", "Tidak"]).resize().oneTime());
        return ctx.wizard.selectStep(4);
    }
    // if user choose yes, show wallets
    if (response === "Ya") {
        const wallets = await wallet_model_1.default.find({ userId: userId })
            .sort({
            updatedAt: -1,
        })
            .limit(5)
            .select({
            name: 1,
            _id: 1,
            balance: 1,
        });
        // filter wallets that have enough balance
        const filteredWallets = wallets.filter((wallet) => {
            if (transactionType === Transaction_1.TransactionType.OUT) {
                return wallet.balance >= Number(amount);
            }
            return true;
        });
        if (filteredWallets.length === 0) {
            ctx.reply("Tidak ada dompet yang memiliki saldo cukup, silahkan buat dompet baru, \nAksi dibatalkan");
            return ctx.scene.leave();
        }
        // set wallet to session
        ctx.session.__scenes.state.wallets = filteredWallets;
        ctx.reply(`Pilih dompet (Hanya menampilkan 5 dompet yang memiliki aktivitas terbaru ${transactionType === Transaction_1.TransactionType.OUT && "dan saldo yang cukup"})`, telegraf_1.Markup.keyboard(filteredWallets.map((e) => e.name))
            .resize()
            .oneTime());
        return ctx.wizard.next();
    }
    else {
        // else create transaction without wallet
        const { name, amount, type } = ctx.session.__scenes.state;
        const data = {
            userId,
            description: name,
            amount,
            type,
            note: "Dibuat melalui bot",
            includeInCalculation: true,
        };
        try {
            await TransactionService.create(data);
            await ctx.reply("Transaksi berhasil dibuat", telegraf_1.Markup.inlineKeyboard([telegraf_1.Markup.button.url("Lihat Transaksi", "https://finaki.acml.me/app/transactions")]));
        }
        catch (error) {
            ctx.reply("Ada yang salah");
        }
        finally {
            await ctx.editMessageReplyMarkup({ reply_markup: { remove_keyboard: true } });
            telegraf_1.Markup.removeKeyboard();
            return ctx.scene.leave();
        }
    }
}, 
// step 5: validate wallet and create transaction
async (ctx) => {
    const walletName = ctx.message.text;
    const userId = ctx.state.user._id;
    const wallets = ctx.session.__scenes.state.wallets;
    const walletId = wallets.find((wallet) => wallet.name === walletName);
    if (!walletId) {
        ctx.reply("Dompet tidak ditemukan, silahkan pilih dompet yang tersedia", telegraf_1.Markup.keyboard(wallets.map((e) => e.name))
            .resize()
            .oneTime());
        return ctx.wizard.selectStep(5);
    }
    const { name, amount, type } = ctx.session.__scenes.state;
    const data = {
        userId,
        walletId,
        description: name,
        amount,
        type,
        note: "Dibuat melalui telegram bot",
        includeInCalculation: true,
    };
    try {
        await TransactionService.create(data);
        await ctx.reply("Transaksi berhasil dibuat", telegraf_1.Markup.inlineKeyboard([telegraf_1.Markup.button.url("Lihat Transaksi", "https://finaki.acml.me/app/transactions")]));
    }
    catch (error) {
        ctx.reply("Ada yang salah");
    }
    finally {
        telegraf_1.Markup.removeKeyboard();
        return ctx.scene.leave();
    }
});
exports.transactionStage = new Stage([addTransactionWizard]);
