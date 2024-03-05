import { default as Img } from "next/image";

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
      <div className="relative h-full w-full">
        <Img
          priority={priority}
          fill
          style={{ objectFit: "cover" }}
          src={src}
          alt={alt}
          sizes={sizes}
          quality={70}
        />
      </div>
    </div>
  );
};

export default Image;
