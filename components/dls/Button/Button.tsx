import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  type: "submit" | "button";
  width: "full" | "auto" | "fit";
  className?: string;
};

const Button = ({ children, type, width, className }: Props) => {
  return (
    <button
      type={type}
      className={classNames(
        "px-4 py-4 bg-blue-500 rounded-xl text-white transition-all hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-700",
        { "w-full": width === "full" },
        { "w-auto": width === "auto" },
        { "w-fit": width === "fit" },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
