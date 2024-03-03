import mongoose from "mongoose";

export const TransactionSchema = new mongoose.Schema(
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
    note: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["in", "out"],
      required: true,
    },
    includeInCalculation: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transaction", TransactionSchema);
