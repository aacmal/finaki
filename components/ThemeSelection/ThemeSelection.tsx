"use client";

import Heading from "@/dls/Heading";
import { Theme, ThemeState } from "@/types/Theme";
import React, { useState } from "react";
import ThemeOption from "./ThemeOption";

const ThemeSelection = (props: any) => {
  const [theme, setTheme] = useState<ThemeState>(Theme.Light);
  const themeList = [
    {
      src: "/images/lightmode_preview.jpg",
      alt: "lightmode preview",
    },
    {
      src: "/images/darkmode_preview.jpg",
      alt: "darkmode preview",
    },
  ];
  return (
    <div>
      <Heading className="mb-3">Tema</Heading>
      <div className="flex gap-3 p-3 lg:p-5 rounded-2xl bg-slate-50">
        <ThemeOption
          {...themeList[0]}
          onClick={() => setTheme(Theme.Light)}
          active={theme === Theme.Light}
        />
        <ThemeOption
          {...themeList[1]}
          onClick={() => setTheme(Theme.Dark)}
          active={theme === Theme.Dark}
        />
      </div>
    </div>
  );
};

export default ThemeSelection;
