import { default as Img } from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
  sizes?: string;
};

const Image = ({ src, alt, className, priority, sizes }: Props) => {
  return (
    <div className={className}>
      <div className="h-full w-full relative">
        <Img
          priority={priority}
          fill
          style={{ objectFit: "cover" }}
          src={src}
          alt={alt}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default Image;
