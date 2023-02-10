import { Types } from "mongoose";

export interface IWallet {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  color: string;
  balance: number;
}
