import { Theme, ThemeState } from "@/types/Theme";
import { User } from "@/types/User";
import create from "zustand";

interface Store {
  user: User | null;
  colorTheme: ThemeState;
  setUser: (user: User) => void;
  setColorTheme: (theme: ThemeState) => void;
}

const currentUser = {
  id: "1",
  name: "John Doe",
  email: "jogndoe@mail.com",
  tokenTelegram: "1234456",
}

const useStore = create<Store>((set) => ({
  user: currentUser,
  colorTheme: Theme.Light,
  setUser: (user: User) => set({ user }),
  setColorTheme: (theme: ThemeState) => set({ colorTheme: theme }),
}));

export default useStore;