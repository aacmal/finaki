"use client";

import IconButton from "@/dls/IconButton";
import MoonIcon from "@/icons/MoonIcon";
import SunIcon from "@/icons/SunIcon";
import { Theme, ThemeState } from "@/types/Theme";
import React, { useState } from "react";
import useTheme from "../../hooks/useTheme";
import useStore from "../../stores/store";

type Props = {};

const ThemeToggleIcon = (props: Props) => {
  const { colorTheme, setColorTheme } = useTheme();

  function toggleTheme() {
    if (colorTheme === Theme.Light) {
      setColorTheme(Theme.Dark);
    } else {
      setColorTheme(Theme.Light);
    }
  }

  return (
    <IconButton className="ml-2" onClick={toggleTheme}>
      {colorTheme === Theme.Light ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default ThemeToggleIcon;
