import React, { forwardRef } from "react";
import classNames from "classnames";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Checkbox = forwardRef(function Checkbox(
  { className, label, id, ...props }: Props,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <div
      className={classNames(
        "flex items-center text-gray-900 dark:text-gray-300",
        className,
      )}
    >
      <input
        className="h-4 w-4 accent-blue-500"
        id={id}
        type="checkbox"
        {...props}
        ref={ref}
      />
      <label htmlFor={id} className="ml-2 select-none text-sm font-medium">
        {label}
      </label>
    </div>
  );
});

export default Checkbox;
