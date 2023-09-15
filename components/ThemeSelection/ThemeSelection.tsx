"use client";

import Heading from "@/dls/Heading";
import { Theme } from "@/types/Theme";
import useHydration from "../../hooks/useHydration";
import useTheme from "../../hooks/useTheme";
import ContentWrapper from "../Container/ContentWrapper";
import ThemeOption from "./ThemeOption";

const ThemeSelection = () => {
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
      <ContentWrapper className="flex gap-3 p-3 lg:p-5">
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
      </ContentWrapper>
    </div>
  );
};

export default ThemeSelection;
