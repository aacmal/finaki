import { Types } from "mongoose";

export interface ITransaction {
  _id?: string | Types.ObjectId;
  userId?: string | Types.ObjectId | Express.User | undefined;
  description: string;
  type: "in" | "out";
  amount: number;
  category?: string;
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
