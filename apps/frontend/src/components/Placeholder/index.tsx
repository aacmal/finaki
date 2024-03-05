import React from "react";
import classNames from "classnames";

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
        "animate-pulse rounded-lg bg-slate-300 dark:bg-slate-500",
        className,
      )}
    ></div>
  );
};

export default Placeholder;
