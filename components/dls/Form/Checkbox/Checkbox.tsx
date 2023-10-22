import classNames from "classnames";
import React, { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Checkbox = forwardRef(function Checkbox(
  { className, label, id, ...props }: Props,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div
      className={classNames(
        "flex items-center text-gray-900 dark:text-gray-300",
        className
      )}
    >
      <input
        className="w-4 h-4 accent-blue-500"
        id={id}
        type="checkbox"
        {...props}
        ref={ref}
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium select-none">
        {label}
      </label>
    </div>
  );
});

export default Checkbox;
