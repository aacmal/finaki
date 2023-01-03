import { Theme, ThemeState } from "@/types/Theme";
import { useEffect, useState } from "react";
import useStore from "../stores/store";

export default function useTheme(theme?: ThemeState){
  const { colorTheme, setColorTheme } = useStore((state) => ({
    colorTheme: state.colorTheme,
    setColorTheme: state.setColorTheme,
  }));

  useEffect(() => {
    if (colorTheme === Theme.Dark) {
      document.documentElement.classList.add(Theme.Dark);
    } else {
      document.documentElement.classList.remove(Theme.Dark);
    }
  }, [colorTheme]);

  return { colorTheme, setColorTheme };
}