import IconWrapper from "@/dls/IconWrapper";
import classNames from "classnames";
import { forwardRef, InputHTMLAttributes, Ref } from "react";
import style from "./RadioButton.module.scss";

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
    { id, label, className, icon, checked, ...props }: Props,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <li className={classNames("w-full cursor-pointer", className)}>
        <input
          className="sr-only peer"
          type="radio"
          id={id}
          ref={ref}
          {...props}
        />
        <label
          className="flex cursor-pointer dark:text-slate-200 items-center justify-center gap-1 font-medium pl-3 pr-4 h-full py-4 w-full text-sm rounded-lg border-slate-200 dark:border-slate-500 border peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-500/20"
          htmlFor={id}
        >
          {icon && <IconWrapper className="!w-4 mr-1">{icon}</IconWrapper>}
          {label}
        </label>
      </li>
    );
  }
);

export default RadioButton;
