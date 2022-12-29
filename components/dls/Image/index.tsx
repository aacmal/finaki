import { default as Img } from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
  className: string;
};

const Image = ({ src, alt, className }: Props) => {
  return (
    <div className={className}>
      <div className="h-full w-full relative">
        <Img fill style={{ objectFit: "cover" }} src={src} alt={alt} />
      </div>
    </div>
  );
};

export default Image;
