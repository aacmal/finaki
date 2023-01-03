import { ThemeState } from "@/types/Theme";
import { User } from "@/types/User";
import create from "zustand";

interface Store {
  user: User | null;
  setUser: (user: User) => void;
}

const currentUser = {
  id: "1",
  name: "John Doe",
  email: "jogndoe@mail.com",
  tokenTelegram: "1234456",
}

const useStore = create<Store>((set) => ({
  user: currentUser,
  setUser: (user: User) => set({ user }),
}));

export default useStore;