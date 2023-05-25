import { Transaction } from "@/types/Transaction";
import { create } from "zustand";

interface TransactionStore {
  transactionDetailState: {
    isOpen: boolean;
    transaction?: Transaction;
  };
  setTransactionDetailState: ({
    isOpen,
    transaction,
  }: {
    isOpen: boolean;
    transaction?: Transaction;
  }) => void;
}

const transactionStore = create<TransactionStore>((set, get) => ({
  transactionDetailState: {
    isOpen: false,
  },
  setTransactionDetailState: ({
    isOpen,
    transaction: transactionDetailState,
  }) =>
    set({
      transactionDetailState: {
        isOpen: isOpen,
        transaction: transactionDetailState,
      },
    }),
}));

export default transactionStore;
