import { forwardRef, InputHTMLAttributes, Ref } from "react";
import classNames from "classnames";

import IconWrapper from "../../IconWrapper";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;
  checked?: boolean;
}

// eslint-disable-next-line react/display-name
const RadioButton = forwardRef(
  (
    { id, label, className, icon, ...props }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <li className={classNames("w-full cursor-pointer", className)}>
        <input
          className="peer sr-only"
          type="radio"
          id={id}
          ref={ref}
          {...props}
        />
        <label
          className="flex h-full w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-slate-200 py-4 pl-3 pr-4 text-sm font-medium peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-slate-500 dark:text-slate-200 dark:peer-checked:bg-blue-500/20"
          htmlFor={id}
        >
          {icon && <IconWrapper className="mr-1 !w-4">{icon}</IconWrapper>}
          {label}
        </label>
      </li>
    );
  },
);

export default RadioButton;
