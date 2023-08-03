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
const dotenv_1 = __importDefault(require("dotenv"));
const wallet_model_1 = __importDefault(require("../../models/wallet.model"));
const Transaction_1 = require("../../interfaces/Transaction");
const TransactionService = __importStar(require("../../services/transaction.service"));
dotenv_1.default.config();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { WizardScene, Stage } = telegraf_1.Scenes;
const superWizard = new WizardScene("super-wizard", (ctx) => {
    ctx.reply(ctx.user);
    return ctx.wizard.next();
}, (ctx) => {
    ctx.session.__scenes.state.name = ctx.message.text;
    ctx.reply("Enter your phone number");
    return ctx.wizard.next();
}, (ctx) => {
    ctx.session.__scenes.state.phone = ctx.message.text;
    const { name, phone } = ctx.session.__scenes.state;
    ctx.reply(`Your name is ${name}`);
    ctx.reply(`Your phone is ${phone}`);
    ctx.reply("Is this correct?", telegraf_1.Markup.keyboard(["Yes", "No"]).resize().oneTime());
    return ctx.scene.leave();
});
const addTransactionWizard = new WizardScene("new-transaction", (ctx) => {
    // step 1: ask for name
    ctx.reply("Ketikan nama transaksi");
    return ctx.wizard.next();
}, (ctx) => {
    // step 2: ask for amount
    ctx.session.__scenes.state.name = ctx.message.text;
    ctx.reply("Ketikan jumlah transaksi");
    return ctx.wizard.next();
}, (ctx) => {
    // step 3: validate amount and ask for type
    const amount = ctx.message.text;
    if (isNaN(amount)) {
        ctx.reply("Jumlah transaksi harus angka, silahkan ulangi");
        console.log(ctx.wizard.cursor);
        return ctx.wizard.selectStep(2);
    }
    ctx.session.__scenes.state.amount = ctx.message.text;
    ctx.reply("Pilih Jenis Transaksi", telegraf_1.Markup.keyboard([
        ["⬆️ Masuk", "⬇️ Keluar"], // Row1 with 2 buttons
    ])
        .oneTime()
        .resize());
    return ctx.wizard.next();
}, (ctx) => {
    // step 4: validate type and ask for wallet
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
}, async (ctx) => {
    const response = ctx.message.text;
    const userId = ctx.state.user._id;
    if (response !== "Ya" && response !== "Tidak") {
        ctx.reply("Pilih salah satu", telegraf_1.Markup.keyboard(["Ya", "Tidak"]).resize().oneTime());
        return ctx.wizard.selectStep(4);
    }
    if (response === "Ya") {
        const wallets = await wallet_model_1.default.find({ userId: userId })
            .sort({
            updatedAt: -1,
        })
            .limit(5)
            .select({
            name: 1,
            _id: 1,
        });
        // set wallet to session
        ctx.session.__scenes.state.wallets = wallets;
        ctx.reply("Pilih dompet (Hanya menampilkan 5 dompet yang memiliki aktivitas terbaru)", telegraf_1.Markup.keyboard(wallets.map((e) => e.name))
            .resize()
            .oneTime());
        return ctx.wizard.next();
    }
    else {
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
            const transaction = await TransactionService.create(data);
            ctx.reply("Transaksi berhasil dibuat");
        }
        catch (error) {
            ctx.reply("Ada yang salah");
        }
        finally {
            return ctx.scene.leave();
        }
    }
}, async (ctx) => {
    const walletName = ctx.message.text;
    const userId = ctx.state.user._id;
    const wallets = ctx.session.__scenes.state.wallets;
    const walletId = wallets.find((wallet) => wallet.name === walletName);
    console.log(walletId);
    console.log(wallets);
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
        note: "Dibuat melalui bot",
        includeInCalculation: true,
    };
    try {
        const transaction = await TransactionService.create(data);
        console.log(transaction);
        ctx.reply("Transaksi berhasil dibuat");
    }
    catch (error) {
        ctx.reply("Ada yang salah");
        console.log(error);
    }
    finally {
        return ctx.scene.leave();
    }
});
exports.transactionStage = new Stage([addTransactionWizard]);
