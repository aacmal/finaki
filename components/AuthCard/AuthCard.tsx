import classNames from "classnames";
import React from "react";
import Image from "@/dls/Image";

type Props = {
  children: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
  className?: string;
};

const AuthCard = ({ children, className, imageUrl, imageAlt }: Props) => {
  return (
    <div className={classNames("flex flex-col lg:flex-row items-center max-w-xl lg:max-w-6xl w-[90%] lg:h-[60%] h-fit p-4 bg-white dark:bg-slate-600  dark:shadow-slate-800 rounded-2xl shadow-2xl shadow-slate-200", className)}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        className="w-[40%] lg:w-[60%] aspect-square hidden lg:block"
      />
      {children}
    </div>
  );
};

export default AuthCard;
