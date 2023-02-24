import classNames from "classnames";
import React, { forwardRef, LegacyRef, Ref } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  transparent?: boolean;
  className?: string;
}

// eslint-disable-next-line react/display-name
const TextArea = forwardRef(
  (
    { transparent, className, ...props }: Props,
    ref: LegacyRef<HTMLTextAreaElement>
  ) => {
    return (
      <textarea
        className={classNames(
          "w-full py-1 px-2 rounded-md dark:text-slate-200",
          {
            "bg-transparent": transparent,
          },
          className
        )}
        ref={ref}
        {...props}
      ></textarea>
    );
  }
);

export default TextArea;
