import Image from "@/dls/Image";
import classNames from "classnames";
import React from "react";

type ThemeOptionProps = {
  active: boolean;
  src: string;
  alt: string;
  className?: string;
  onClick: () => void;
};

const ThemeOption = ({ active, src, alt, onClick }: ThemeOptionProps) => {
  return (
    <div
      className={classNames(
        "w-fit border-2 hover:ring-4 ring-blue-300 transition-all rounded-2xl",
        { "border-blue-400": active },
        { "border-transparent": !active }
      )}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        className="w-[10rem] md:w-[18rem] lg:w-[24rem] aspect-[4/3] rounded-2xl overflow-hidden"
        priority
      />
    </div>
  );
};

export default ThemeOption;
