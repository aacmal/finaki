import classNames from "classnames";
import React, { forwardRef, Ref } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  transparent?: boolean;
  className?: string;
  error?: any;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  ({ transparent, className, ...props }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        className={classNames(
          "w-full py-2 px-3 rounded-md bg-gray-100 text-slate-800 dark:text-slate-100 dark:bg-slate-500",
          {
            "bg-transparent": transparent,
          },
          { "border-red-500": props.error },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
