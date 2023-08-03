/* eslint-disable @typescript-eslint/no-explicit-any */
import { Telegraf, Markup, Scenes, session } from "telegraf";
import dotenv from "dotenv";
import WalletModel from "../../models/wallet.model";
import { ICreateTransactionInput, TransactionType } from "../../interfaces/Transaction";
import * as TransactionService from "../../services/transaction.service";
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { WizardScene, Stage } = Scenes;

const superWizard = new WizardScene(
  "super-wizard",
  (ctx: any) => {
    ctx.reply(ctx.user);
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.session.__scenes.state.name = ctx.message.text;
    ctx.reply("Enter your phone number");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.session.__scenes.state.phone = ctx.message.text;
    const { name, phone } = ctx.session.__scenes.state;
    ctx.reply(`Your name is ${name}`);
    ctx.reply(`Your phone is ${phone}`);
    ctx.reply("Is this correct?", Markup.keyboard(["Yes", "No"]).resize().oneTime());
    return ctx.scene.leave();
  },
);

const addTransactionWizard = new WizardScene(
  "new-transaction",
  (ctx: any) => {
    // step 1: ask for name
    ctx.reply("Ketikan nama transaksi");
    return ctx.wizard.next();
  },
  (ctx) => {
    // step 2: ask for amount
    ctx.session.__scenes.state.name = ctx.message.text;
    ctx.reply("Ketikan jumlah transaksi");
    return ctx.wizard.next();
  },
  (ctx) => {
    // step 3: validate amount and ask for type
    const amount = ctx.message.text;
    if (isNaN(amount)) {
      ctx.reply("Jumlah transaksi harus angka, silahkan ulangi");
      console.log(ctx.wizard.cursor);
      return ctx.wizard.selectStep(2);
    }
    ctx.session.__scenes.state.amount = ctx.message.text;
    ctx.reply(
      "Pilih Jenis Transaksi",
      Markup.keyboard([
        ["⬆️ Masuk", "⬇️ Keluar"], // Row1 with 2 buttons
      ])
        .oneTime()
        .resize(),
    );
    return ctx.wizard.next();
  },
  (ctx) => {
    // step 4: validate type and ask for wallet
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
  async (ctx) => {
    const response = ctx.message.text;
    const userId = ctx.state.user._id;

    if (response !== "Ya" && response !== "Tidak") {
      ctx.reply("Pilih salah satu", Markup.keyboard(["Ya", "Tidak"]).resize().oneTime());
      return ctx.wizard.selectStep(4);
    }

    if (response === "Ya") {
      const wallets = await WalletModel.find({ userId: userId })
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

      ctx.reply(
        "Pilih dompet (Hanya menampilkan 5 dompet yang memiliki aktivitas terbaru)",
        Markup.keyboard(wallets.map((e) => e.name))
          .resize()
          .oneTime(),
      );
      return ctx.wizard.next();
    } else {
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
        const transaction = await TransactionService.create(data);
        ctx.reply("Transaksi berhasil dibuat");
      } catch (error) {
        ctx.reply("Ada yang salah");
      } finally {
        return ctx.scene.leave();
      }
    }
  },
  async (ctx) => {
    const walletName = ctx.message.text;
    const userId = ctx.state.user._id;
    const wallets = ctx.session.__scenes.state.wallets;
    const walletId = wallets.find((wallet: any) => wallet.name === walletName);
    console.log(walletId);
    console.log(wallets);

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
      note: "Dibuat melalui bot",
      includeInCalculation: true,
    };

    try {
      const transaction = await TransactionService.create(data);
      console.log(transaction);
      ctx.reply("Transaksi berhasil dibuat");
    } catch (error) {
      ctx.reply("Ada yang salah");
      console.log(error);
    } finally {
      return ctx.scene.leave();
    }
  },
);

export const transactionStage = new Stage([addTransactionWizard]);
