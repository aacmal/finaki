import React from "react";
import classNames from "classnames";

import Image from "../dls/Image";

type Props = {
  children: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
};

const AuthCard = ({ children, className, imageUrl, imageAlt }: Props) => {
  return (
    <div
      className={classNames(
        "mx-auto mb-16 mt-32 flex h-fit w-[90%] max-w-xl flex-col items-center rounded-2xl bg-white p-6 shadow-2xl shadow-slate-200 dark:bg-slate-600 dark:shadow-slate-800 lg:mx-0 lg:mb-0 lg:mt-0 lg:max-w-6xl lg:flex-row",
        className,
      )}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt ?? ""}
          className="hidden aspect-square w-[40%] lg:block lg:w-[60%]"
          priority
        />
      )}

      {children}
    </div>
  );
};

export default AuthCard;
