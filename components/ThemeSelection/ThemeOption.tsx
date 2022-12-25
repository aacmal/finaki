import classNames from "classnames";
import Image from "next/image";
import React from "react";

type ThemeOptionProps = {
  active: boolean;
  src: string;
  alt: string;
  className?: string;
  onClick: () => void;
};

const ThemeOption = ({
  active,
  src,
  alt,
  className,
  onClick,
}: ThemeOptionProps) => {
  return (
    <div
      className={classNames(
        "w-fit border-2 hover:ring-4 ring-blue-300 transition-all rounded-2xl",
        { "border-blue-400": active },
        { "border-transparent": !active }
      )}
      onClick={onClick}
    >
      <div className="w-[10rem] md:w-[18rem] lg:w-[24rem] aspect-[4/3] rounded-2xl overflow-hidden">
        <div className="h-full w-full relative">
          <Image fill style={{ objectFit: "cover" }} src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
};

export default ThemeOption;
