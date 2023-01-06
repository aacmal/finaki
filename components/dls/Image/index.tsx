import { default as Img } from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
};

const Image = ({ src, alt, className, priority }: Props) => {
  return (
    <div className={className}>
      <div className="h-full w-full relative">
        <Img
          priority={priority}
          fill
          style={{ objectFit: "cover" }}
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
};

export default Image;
