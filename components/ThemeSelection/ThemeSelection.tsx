"use client";

import Heading from "@/dls/Heading";
import { Theme, ThemeState } from "@/types/Theme";
import React, { useState } from "react";
import useHydration from "../../hooks/useHydration";
import useTheme from "../../hooks/useTheme";
import ThemeOption from "./ThemeOption";

const ThemeSelection = (props: any) => {
  const { colorTheme, setColorTheme } = useTheme();
  const hydrated = useHydration();

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

  if (!hydrated) return <></>;
  return (
    <div>
      <Heading level={2} fontWeight="medium" className="mb-3">
        Tema
      </Heading>
      <div className="flex gap-3 p-3 lg:p-5 rounded-2xl bg-white/70 dark:bg-slate-700 shadow-xl shadow-zinc-200/60 dark:shadow-slate-800">
        <ThemeOption
          {...themeList[0]}
          onClick={() => setColorTheme(Theme.Light)}
          active={colorTheme === Theme.Light}
        />
        <ThemeOption
          {...themeList[1]}
          onClick={() => setColorTheme(Theme.Dark)}
          active={colorTheme === Theme.Dark}
        />
      </div>
    </div>
  );
};

export default ThemeSelection;
