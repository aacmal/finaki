/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * During refactoring to Monorepo, I found this file is so many eslint error
 * I Don't know why, but I think this is because of the typescript version
 * or maybe the eslint version, so for now I will disable some eslint rule
 * and I will fix it later
 */
import dotenv from "dotenv";
import { session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { TransactionType, } from "../interfaces/Transaction";
import UserModel from "../models/user.model";
import { transactionStage } from "./bot/transaction.scene";
import * as TransactionService from "./transaction.service";
dotenv.config();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(Telegraf.log());
const currentUser = async (messageId) => {
    const user = await UserModel.findOne({ "telegramAccount.id": messageId });
    if (!user) {
        throw new Error("Akun telegram ini belum terhubung, paste token kamu untuk menghubungkan");
    }
    return user;
};
bot.start(async (ctx) => {
    await ctx.reply("Selamat datang di bot Finaki - Money Manager \nBot ini akan membantu kamu dalam mengelola keuangan kamu");
    await ctx.reply("Silahkan ketik /help untuk melihat daftar perintah");
    await ctx.reply("Masukan token kamu untuk memulai");
});
bot.help(async (ctx) => {
    await ctx.reply("Daftar perintah yang tersedia: \n /help \n /start \n /token \n /in \n /out \n /balance");
});
bot.command("/user", async (ctx) => {
    try {
        const user = await UserModel.findOne({
            "telegramAccount.id": ctx.message.from.id,
        });
        if (!user) {
            await ctx.reply("Akun telegram ini belum terhubung, ketik /token untuk menghubungkan");
            return;
        }
        await ctx.reply(`Akun telegram ini terhubung dengan token ${user.token}`);
    }
    catch (error) {
        await ctx.reply("Ada yang salah", error.message);
    }
});
bot.command("/in", async (ctx) => {
    try {
        // console.log(ctx.message)
        const description = ctx.message?.text.split("#")[0].replace("/in ", "") ?? "";
        const amount = ctx.message?.text.split("#")[1];
        const walletName = ctx.message?.text.split("#")[2];
        if (!description || !amount) {
            await ctx.reply("Perintah tidak lengkap \nFormat: /in <deskripsi>#<nominal>#<nama_dompet> \nContoh: /in Gaji#1000000#Dompet Utama");
            return;
        }
        const user = await UserModel.findOne({
            "telegramAccount.id": ctx.message.from.id,
        }).populate("wallets");
        if (!user) {
            await ctx.reply("Akun telegram ini belum terhubung, ketik /token untuk menghubungkan");
            return;
        }
        const wallet = user.wallets.find((wallet) => wallet.name === walletName);
        if (!wallet && walletName) {
            await ctx.reply("Dompet tidak ditemukan");
            return;
        }
        const transaction = {
            userId: user._id,
            description,
            amount,
            note: "Created in Telegram Bot",
            type: TransactionType.IN,
            includeInCalculation: true,
            walletId: walletName ? wallet._id : undefined,
        };
        const createdTransaction = await TransactionService.create(transaction);
        await ctx.reply(`Transaksi berhasil dibuat \nDeskripsi: ${createdTransaction.description} \nNominal: Rp ${createdTransaction.amount} \nTipe Transaksi: Masuk \nDompet: ${walletName ? walletName : ""}`);
    }
    catch (error) {
        await ctx.reply(error);
    }
});
bot.command("/out", async (ctx) => {
    try {
        // console.log(ctx.message)
        const description = ctx.message?.text.split("#")[0].replace("/out ", "") ?? "";
        const amount = ctx.message?.text.split("#")[1];
        const walletName = ctx.message?.text.split("#")[2];
        if (!description || !amount) {
            await ctx.reply("Perintah tidak lengkap \nFormat: /out <deskripsi>#<nominal>#<nama_dompet> \nContoh: /in Gaji#1000000#Dompet Utama");
            return;
        }
        const user = await UserModel.findOne({
            "telegramAccount.id": ctx.message.from.id,
        }).populate("wallets");
        if (!user) {
            await ctx.reply("Akun telegram ini belum terhubung, ketik /token untuk menghubungkan");
            return;
        }
        const wallet = user.wallets.find((wallet) => wallet.name === walletName);
        if (!wallet && walletName) {
            await ctx.reply("Dompet tidak ditemukan");
            return;
        }
        if (wallet.balance < amount) {
            await ctx.reply("Saldo dompet tidak mencukupi");
            return;
        }
        const transaction = {
            userId: user._id,
            description,
            amount,
            type: TransactionType.OUT,
            note: "",
            includeInCalculation: true,
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            walletId: walletName ? wallet._id : undefined,
        };
        const createdTransaction = await TransactionService.create(transaction);
        await ctx.reply(`Transaksi berhasil dibuat \nDeskripsi: ${createdTransaction.description} \nNominal: Rp ${createdTransaction.amount} \nTipe Transaksi: Keluar \nDompet: ${walletName ? walletName : ""}`);
    }
    catch (error) {
        await ctx.reply("Ada Yang salah ", error.message);
    }
});
bot.command("/balance", async (ctx) => {
    try {
        const walletName = ctx.message?.text.split("#")[1];
        if (!walletName) {
            await ctx.reply("Perintah tidak lengkap \nFormat: /balance#<nama_dompet> \nContoh: /balance Dompet Utama");
            return;
        }
        const user = await UserModel.findOne({
            "telegramAccount.id": ctx.message.from.id,
        }).populate("wallets");
        if (!user) {
            await ctx.reply("Akun telegram ini belum terhubung, ketik /token untuk menghubungkan");
            return;
        }
        const wallet = user.wallets.find((wallet) => wallet.name === walletName);
        if (!wallet) {
            await ctx.reply("Dompet tidak ditemukan");
            return;
        }
        await ctx.reply(`Saldo dompet ${wallet.name} adalah Rp ${wallet.balance}`);
    }
    catch (error) {
        await ctx.reply("Ada Yang salah ", error.message);
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
        await ctx.reply(error.message);
    }
});
bot.use(session());
bot.use(transactionStage.middleware());
bot.command("add", async (ctx) => {
    await ctx.scene.enter("new-transaction");
});
// connect telegram account to user
bot.on(message("text"), async (ctx) => {
    const message = ctx.message.text;
    if (message.length !== 20) {
        await ctx.reply("Harap masukan sesuai format periintah");
        return;
    }
    try {
        const user = await UserModel.findOneAndUpdate({ token: message }, {
            telegramAccount: {
                id: ctx.message.from.id,
                username: ctx.message.from.username,
                first_name: ctx.message.from.first_name,
            },
        });
        if (!user) {
            await ctx.reply("Token belum terdaftar");
            return;
        }
        await ctx.reply("Akun telegram berhasil terhubung, ketik /menu untuk melihat daftar perintah");
    }
    catch (error) {
        await ctx.reply("Gagal menghubungkan \nAkun telegram ini sudah terhubung dengan token lain, putuskan terlebih dahulu di akun web kamu");
    }
});
bot.catch(async (err, ctx) => {
    await ctx.reply("Ooops, terjadi kesalahan");
    console.log(err);
});
export default bot;
