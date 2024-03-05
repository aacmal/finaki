import React from "react";
import classNames from "classnames";

import Image from "../dls/Image";

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
        "w-fit rounded-2xl border-2 ring-blue-300 transition-all hover:ring-4",
        { "border-blue-400": active },
        { "border-transparent": !active },
      )}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        className="aspect-[4/3] w-[10rem] overflow-hidden rounded-2xl md:w-[18rem] lg:w-[24rem]"
        priority
        sizes="(max-width: 640px) 100px, (max-width: 768px) 50vw, 3"
      />
    </div>
  );
};

export default ThemeOption;
