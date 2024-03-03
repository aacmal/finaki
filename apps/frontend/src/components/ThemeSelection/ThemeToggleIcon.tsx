"use client";

import IconButton from "../dls/IconButton";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import { Theme } from "@/types/Theme";
import useHydration from "../../hooks/useHydration";
import useTheme from "../../hooks/useTheme";

const ThemeToggleIcon = () => {
  const { colorTheme, setColorTheme } = useTheme();
  const hydrated = useHydration();

  function toggleTheme() {
    if (colorTheme === Theme.Light) {
      setColorTheme(Theme.Dark);
    } else {
      setColorTheme(Theme.Light);
    }
  }

  if (!hydrated) return <></>;
  return (
    <IconButton className="ml-2 dark:text-slate-200" onClick={toggleTheme}>
      {colorTheme === Theme.Light ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default ThemeToggleIcon;
