import {Transaction} from "@/types/Transaction";
import {create} from "zustand";
import {Interval} from "@/api/types/TransactionAPI";

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
  interval: Interval;
  setInterval: (val: Interval) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  dispatchUpdateTransaction: (id: string, newTransaction: Transaction) => void;
  dispatchDeleteTransaction: (id: string) => void;
  dispatchAddTransaction: (transaction: Transaction) => void;
  pushTransactions: (transactions: Transaction[]) => void;
}

const useTransaction = create<TransactionStore>((set) => ({
  transactionDetailState: {
    isOpen: false,
  },
  transactions: [],
  interval: Interval.Weekly,
  setInterval: (val) => {
    set({ interval: val })
  },
  setTransactions: (transactions: Transaction[]) => {
    set({ transactions });
  },
  pushTransactions: (transactions: Transaction[]) => {
    set((state) => ({
      transactions: [...state.transactions, ...transactions],
    }));
  },
  dispatchUpdateTransaction: (id, newTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction._id === id ? newTransaction : transaction
      ),
    })),
  dispatchDeleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction._id !== id
      ),
    })),
  dispatchAddTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

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

export default useTransaction;
