/* eslint-disable @typescript-eslint/no-explicit-any */
import { Markup, Scenes } from "telegraf";
import WalletModel from "../../models/wallet.model";
import { ICreateTransactionInput, TransactionType } from "../../interfaces/Transaction";
import * as TransactionService from "../../services/transaction.service";

const { WizardScene, Stage } = Scenes;

const addTransactionWizard = new WizardScene(
  "new-transaction",
  // step 0: ask for name
  (ctx: any) => {
    ctx.session.__scenes.state = {};
    ctx.reply("Ketikan nama transaksi", Markup.removeKeyboard());
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
    ctx.reply(
      "Pilih Jenis Transaksi",
      Markup.keyboard([["⬆️ Masuk", "⬇️ Keluar"]])
        .oneTime()
        .resize(),
    );
    return ctx.wizard.next();
  },

  // step 3: validate type and ask for wallet
  (ctx) => {
    const response = ctx.message.text;
    let type: string;
    if (response !== "⬆️ Masuk" && response !== "⬇️ Keluar") {
      ctx.reply(
        "Pilih salah satu jenis transaksi",
        Markup.keyboard([
          ["⬆️ Masuk", "⬇️ Keluar"], // Row1 with 2 buttons
        ])
          .oneTime()
          .resize(),
      );
      return ctx.wizard.selectStep(3);
    }
    if (response === "⬆️ Masuk") {
      type = TransactionType.IN;
    } else {
      type = TransactionType.OUT;
    }

    ctx.session.__scenes.state.type = type;
    ctx.reply("Apakah anda ingin memilih dompet?", Markup.keyboard(["Ya", "Tidak"]).resize().oneTime());
    return ctx.wizard.next();
  },

  //  step 4: validate confirmation and choose wallet or save without wallet
  async (ctx) => {
    const response = ctx.message.text;
    const userId = ctx.state.user._id;
    const { type: transactionType, amount } = ctx.session.__scenes.state;

    if (response !== "Ya" && response !== "Tidak") {
      ctx.reply("Pilih salah satu", Markup.keyboard(["Ya", "Tidak"]).resize().oneTime());
      return ctx.wizard.selectStep(4);
    }

    // if user choose yes, show wallets
    if (response === "Ya") {
      const wallets = await WalletModel.find({ userId: userId })
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
      const filteredWallets = wallets.filter((wallet: any) => {
        if (transactionType === TransactionType.OUT) {
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

      ctx.reply(
        `Pilih dompet (Hanya menampilkan 5 dompet yang memiliki aktivitas terbaru ${
          transactionType === TransactionType.OUT && "dan saldo yang cukup"
        })`,
        Markup.keyboard(filteredWallets.map((e) => e.name))
          .resize()
          .oneTime(),
      );
      return ctx.wizard.next();
    } else {
      // else create transaction without wallet

      const { name, amount, type } = ctx.session.__scenes.state;
      const data: ICreateTransactionInput = {
        userId,
        description: name,
        amount,
        type,
        note: "Dibuat melalui bot",
        includeInCalculation: true,
      };

      try {
        await TransactionService.create(data);
        await ctx.reply(
          "Transaksi berhasil dibuat",
          Markup.inlineKeyboard([Markup.button.url("Lihat Transaksi", "https://finaki.acml.me/app/transactions")]),
        );
      } catch (error) {
        ctx.reply("Ada yang salah");
      } finally {
        ctx.reply("Sesi selesai", Markup.removeKeyboard());
        return ctx.scene.leave();
      }
    }
  },

  // step 5: validate wallet and create transaction
  async (ctx) => {
    const walletName = ctx.message.text;
    const userId = ctx.state.user._id;
    const wallets = ctx.session.__scenes.state.wallets;
    const walletId = wallets.find((wallet: any) => wallet.name === walletName);

    if (!walletId) {
      ctx.reply(
        "Dompet tidak ditemukan, silahkan pilih dompet yang tersedia",
        Markup.keyboard(wallets.map((e: any) => e.name))
          .resize()
          .oneTime(),
      );
      return ctx.wizard.selectStep(5);
    }

    const { name, amount, type } = ctx.session.__scenes.state;
    const data: ICreateTransactionInput = {
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
      await ctx.reply(
        "Transaksi berhasil dibuat",
        Markup.inlineKeyboard([Markup.button.url("Lihat Transaksi", "https://finaki.acml.me/app/transactions")]),
      );
    } catch (error) {
      ctx.reply("Ada yang salah");
    } finally {
      ctx.reply("Sesi selesai", Markup.removeKeyboard());
      return ctx.scene.leave();
    }
  },
);

export const transactionStage = new Stage([addTransactionWizard]);
