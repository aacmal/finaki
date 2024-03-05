import React from "react";
import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type: "submit" | "button";
  width: "full" | "auto" | "fit";
  className?: string;
  isLoading?: boolean;
  buttonStyle?: "primary" | "secondary" | "danger";
  background?: boolean;
}

const Button = ({
  children,
  type,
  width,
  className,
  buttonStyle = "primary",
  background = true,
  ...props
}: Props) => {
  return (
    <button
      type={type}
      className={classNames(
        "rounded-xl px-4 py-4 text-white transition-all hover:shadow-2xl disabled:cursor-not-allowed",
        { "w-full": width === "full" },
        { "w-auto": width === "auto" },
        { "w-fit": width === "fit" },
        {
          "bg-blue-500 hover:bg-blue-600 hover:shadow-blue-200 dark:hover:shadow-blue-700":
            buttonStyle === "primary" && background,
          "bg-gray-500 hover:bg-gray-600 hover:shadow-gray-200 dark:hover:shadow-gray-700 ":
            buttonStyle === "secondary" && background,
          "bg-red-500 hover:bg-red-600 hover:shadow-red-200 dark:hover:shadow-red-700":
            buttonStyle === "danger" && background,
        },
        {
          "text-blue-500 hover:text-blue-600":
            buttonStyle === "primary" && !background,
          "text-gray-500 hover:text-gray-600":
            buttonStyle === "secondary" && !background,
          "text-red-500 hover:text-red-600":
            buttonStyle === "danger" && !background,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
