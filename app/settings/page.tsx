import Heading from "@/dls/Heading";
import Image from "next/image";
import React from "react";
import ThemeSelection from "../../components/ThemeSelection/ThemeSelection";

type Props = {};

const Page = (props: Props) => {
  const themeList = [
    {
      src: "/images/lightmode_preview.jpg",
      alt: "lightmode preview",
    },
    {
      src: "/images/darkmode_preview.jpg",
      alt: "darkmode preview",
    }
  ]
  return (
    <div>
      <Heading className="mb-3">Tema</Heading>
      <div className="flex gap-3">
        <ThemeSelection {...themeList[0]} active/>
        <ThemeSelection {...themeList[1]} active={false}/>
      </div>
    </div>
  );
};

export default Page;
