import mongoose from "mongoose";

export const WalletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      min: [0, "Balance cannot be negative"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    isCredit: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Wallet", WalletSchema);
