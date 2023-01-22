import classNames from "classnames";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  transparent?: boolean;
  className?: string;
}

const Input = ({ transparent, className, ...props }: Props) => {
  return (
    <input
      className={classNames(
        "w-full py-1 px-2 rounded-md dark:text-slate-200",
        {
          "bg-transparent": transparent,
        },
        className
      )}
    />
  );
};

export default Input;
