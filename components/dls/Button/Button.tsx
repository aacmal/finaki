import classNames from "classnames";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type: "submit" | "button";
  width: "full" | "auto" | "fit";
  className?: string;
  isLoading?: boolean;
}

const Button = ({ children, type, width, className, ...props }: Props) => {
  return (
    <button
      type={type}
      className={classNames(
        "px-4 py-4 disabled:cursor-not-allowed bg-blue-500 rounded-xl text-white transition-all hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-700",
        { "w-full": width === "full" },
        { "w-auto": width === "auto" },
        { "w-fit": width === "fit" },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
