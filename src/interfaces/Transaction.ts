import { TransactionSchema } from "models/transaction.model";
import { InferSchemaType, Document } from "mongoose";

export enum TransactionType {
  IN = "in",
  OUT = "out",
}

export type ITransactionModel = InferSchemaType<typeof TransactionSchema> & Document;

export type ITransactionData = InferSchemaType<typeof TransactionSchema>;

export type ICreateTransactionInput = Pick<
  ITransactionData,
  "userId" | "walletId" | "description" | "note" | "amount" | "type" | "includeInCalculation"
>;

export type IUpdateTransactionInput = Pick<ITransactionData, "description" | "note" | "amount" | "type">;

export interface ITotalTransaction {
  _id: {
    day: number;
  };
  timestamp: Date;
  in: number;
  out: number;
  totalAmount: number;
}
