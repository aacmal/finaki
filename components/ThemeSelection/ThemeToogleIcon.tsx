import IconButton from "@/dls/IconButton";
import MoonIcon from "@/icons/MoonIcon";
import SunIcon from "@/icons/SunIcon";
import { Theme, ThemeState } from "@/types/Theme";
import React, { useState } from "react";

type Props = {};

const ThemeToggleIcon = (props: Props) => {
  const [theme, setTheme] = useState<ThemeState>(Theme.Light);

  function toggleTheme() {
    setTheme((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light));
  }
  return (
    <IconButton className="ml-2" onClick={toggleTheme}>
      {theme === Theme.Light ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default ThemeToggleIcon;
