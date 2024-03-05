"use client";

import { forwardRef, useState } from "react";
import classNames from "classnames";

import EyeIcon from "../../icons/EyeIcon";
import IconWrapper from "../IconWrapper";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "number" | "password" | "email";
  placeholder: string;
  value?: string | number;
  label?: string;
  id: string;
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
  className?: string;
  inputStyle?: string;
  error?: {
    message: string;
  };
}

// eslint-disable-next-line react/display-name
const InputWithLabel = forwardRef(
  (
    { id, type, label, className, inputStyle, error, ...props }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return (
      <div
        className={classNames(
          "input-with-label-wrapper flex flex-col",
          className,
        )}
      >
        <input
          className={classNames("w-full rounded-xl px-4 py-4", inputStyle)}
          // Show password if type is password and isPasswordVisible is true, otherwise show the type
          type={
            type === "password"
              ? !isPasswordVisible
                ? "password"
                : "text"
              : type
          }
          name={id}
          id={id}
          ref={ref}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
        {error && (
          <small role="alert" className="left-3 font-semibold text-red-400">
            {error.message}
          </small>
        )}
        {type === "password" && (
          <IconWrapper
            onClick={() =>
              setIsPasswordVisible((currentState) => !currentState)
            }
            className={"toggleHide"}
          >
            <EyeIcon isVisible={isPasswordVisible} />
          </IconWrapper>
        )}
      </div>
    );
  },
);

export default InputWithLabel;
