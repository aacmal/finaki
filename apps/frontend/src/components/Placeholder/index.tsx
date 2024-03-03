import classNames from "classnames";
import React from "react";

type Props = {
  className: string;
  animationDelay?: number;
};

const Placeholder = ({ className, animationDelay = 0 }: Props) => {
  return (
    <div
      style={{
        animationDelay: `${animationDelay}ms`,
      }}
      className={classNames(
        "animate-pulse dark:bg-slate-500 bg-slate-300 rounded-lg",
        className
      )}
    ></div>
  );
};

export default Placeholder;
