import { WalletSchema } from "../models/wallet.model";
import { InferSchemaType, Document } from "mongoose";

export interface IWalletModel extends InferSchemaType<typeof WalletSchema>, Document {}
export type IWalletData = Pick<IWalletModel, "name" | "balance" | "color" | "userId">;
export type IWalletInput = Pick<IWalletModel, "name" | "balance" | "color">;

export type BalanceHistory = {
  timestamp: Date;
  value: number;
};
