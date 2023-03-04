import { Theme, ThemeState } from "@/types/Theme";
import { User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  user: User | null;
  colorTheme: ThemeState;
  accessToken: string | null;
  deleteWalletId: string | null;
  transactionDetailState:{
    transactionId: string | null;
    setTransactionId: (id: string | null) => void;
  },
  transferBalanceState: {
    sourceWalletId: string | null;
    setSourceWalletId: (id: string | null) => void;
    destinationWalletId: string | null;
    setDestinationWalletId: (id: string | null) => void;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
  },
  setDeleteWalletId: (id: string | null) => void;
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  setColorTheme: (theme: ThemeState) => void;
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      colorTheme: Theme.Light,
      accessToken: null,
      deleteWalletId: null,
      transactionDetailState: {
        transactionId: null,
        setTransactionId: (id: string | null) => set({ transactionDetailState: { ...get().transactionDetailState, transactionId: id } }),
      },
      transferBalanceState: {
        sourceWalletId: null,
        setSourceWalletId: (id: string | null) => set({ transferBalanceState: { ...get().transferBalanceState, sourceWalletId: id } }),
        destinationWalletId: null,
        setDestinationWalletId: (id: string | null) => set({ transferBalanceState: { ...get().transferBalanceState, destinationWalletId: id } }),
        isOpen: false,
        setOpen: (isOpen: boolean) => set({ transferBalanceState: { ...get().transferBalanceState, isOpen } }),
      },
      setDeleteWalletId: (id: string | null) => set({ deleteWalletId: id }),
      setToken: (token: string) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      setColorTheme: (theme: ThemeState) => set({ colorTheme: theme }),
    }),
    {
      name: "user-data",
      partialize(state) {
        return {
          colorTheme: state.colorTheme,
        };
      },
    }
  )
);

export default useStore;
