import { Theme, ThemeState } from "@/types/Theme";
import { User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  user: User | null;
  colorTheme: ThemeState;
  accessToken: string | null;
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  setColorTheme: (theme: ThemeState) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      colorTheme: Theme.Light,
      accessToken: null,
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
