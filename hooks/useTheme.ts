import { Theme, ThemeState } from "@/types/Theme";
import { useEffect, useState } from "react";
import useStore from "../stores/store";

export default function useTheme(theme?: ThemeState) {
  const { colorTheme, setColorTheme } = useStore((state) => ({
    colorTheme: state.colorTheme,
    setColorTheme: state.setColorTheme,
  }));

  const setMetaThemeColor = (color: string) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", color);
  };

  useEffect(() => {
    if (colorTheme === Theme.Dark) {
      document.documentElement.classList.add(Theme.Dark);
      setMetaThemeColor("#0f172a");
    } else {
      document.documentElement.classList.remove(Theme.Dark);
      setMetaThemeColor("#e7e5e4");
    }
  }, [colorTheme]);

  return { colorTheme, setColorTheme };
}
