import React from "react";
import classNames from "classnames";

type OnHoverWrapper = {
  children: React.ReactNode;
  className?: string;
};

const OnHoverWrapper = ({ children, className }: OnHoverWrapper) => {
  return (
    <div
      className={classNames(
        "invisible absolute right-0 top-0 z-30 w-fit rounded-lg bg-white py-1 opacity-0 shadow-xl transition-all delay-200 group-hover:visible group-hover:top-8 group-hover:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default OnHoverWrapper;
