import classNames from "classnames";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type: "submit" | "button";
  width: "full" | "auto" | "fit";
  className?: string;
  isLoading?: boolean;
  buttonStyle?: "primary" | "secondary" | "danger";
}

const Button = ({
  children,
  type,
  width,
  className,
  buttonStyle = "primary",
  ...props
}: Props) => {
  return (
    <button
      type={type}
      className={classNames(
        "px-4 py-4 disabled:cursor-not-allowed bg-blue-500 rounded-xl text-white transition-all hover:shadow-2xl hover:shadow-blue-200 dark:hover:shadow-blue-700",
        { "w-full": width === "full" },
        { "w-auto": width === "auto" },
        { "w-fit": width === "fit" },
        {
          "bg-blue-500 hover:bg-blue-600 hover:shadow-blue-200 dark:hover:shadow-blue-700":
            buttonStyle === "primary",
          "bg-gray-500 hover:bg-gray-600 hover:shadow-gray-200 dark:hover:shadow-gray-700 ":
            buttonStyle === "secondary",
          "bg-red-500 hover:bg-red-600 hover:shadow-red-200 dark:hover:shadow-red-700 !font-bold":
            buttonStyle === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
