"use client";

import EyeIcon from "@/icons/EyeIcon";
import classNames from "classnames";
import { useState } from "react";
import IconWrapper from "../IconWrapper";
import { forwardRef } from "react";

import styles from "./InputWithLabel.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "number" | "password" | "email";
  placeholder: string;
  value?: string | number;
  label: string;
  id: string;
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
  className?: string;
  error?: {
    message: string;
  };
}

// eslint-disable-next-line react/display-name
const InputWithLabel = forwardRef(
  (
    { id, type, label, className, error, ...props }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return (
      <div
        className={classNames(
          "flex flex-col input-with-label-wrapper",
          styles.inputWithLabelWrapper,
          className
        )}
      >
        <input
          className={classNames("w-full px-4 py-4 rounded-xl")}
          // Show password if type is password and isPasswordVisible is true, otherwise show the type
          type={
            type === "password"
              ? !isPasswordVisible
                ? "password"
                : "text"
              : type
          }
          // If type is email, set the pattern to validate email
          pattern={
            type === "email"
              ? "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}$"
              : undefined
          }
          name={id}
          id={id}
          ref={ref}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
        {error && (
          <small
            role="alert"
            className="text-red-400 absolute -bottom-5 font-semibold left-3"
          >
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
  }
);

export default InputWithLabel;
