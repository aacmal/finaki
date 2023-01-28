import { Types } from "mongoose";

export enum TransactionType {
  IN = "in",
  OUT = "out",
}

export interface ITransaction {
  _id?: string | Types.ObjectId;
  userId?: string | Types.ObjectId | Express.User | undefined;
  description: string;
  type: TransactionType;
  amount: number;
  walletId?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITotalTransaction {
  _id: {
    day: number;
  };
  timestamp: Date;
  in: number;
  out: number;
  totalAmount: number;
}
