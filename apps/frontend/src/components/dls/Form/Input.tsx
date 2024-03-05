import React, { forwardRef, Ref } from "react";
import classNames from "classnames";

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
          "w-full rounded-md bg-gray-100 px-3 py-2 text-slate-800 dark:bg-slate-500 dark:text-slate-100",
          {
            "bg-transparent": transparent,
          },
          { "border-red-500": props.error },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
