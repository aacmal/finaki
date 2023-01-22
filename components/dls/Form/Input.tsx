import classNames from "classnames";
import React, { forwardRef, Ref } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  transparent?: boolean;
  className?: string;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  ({ transparent, className, ...props }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        className={classNames(
          "w-full py-1 px-2 rounded-md dark:text-slate-200",
          {
            "bg-transparent": transparent,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
