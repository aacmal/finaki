import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    initialAmount: {
      type: Number,
      required: true,
      immutable: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", TransactionSchema);
