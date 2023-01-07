"use client";

import EyeIcon from "@/icons/EyeIcon";
import classNames from "classnames";
import { useState } from "react";
import IconWrapper from "../IconWrapper";

import styles from "./InputWithLabel.module.scss";

type Props = {
  type: "text" | "number" | "password" | "email";
  placeholder: string;
  value?: string | number;
  ref?: React.RefObject<HTMLInputElement>;
  label: string;
  id: string;
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
  className?: string;
};

const InputWithLabel = ({
  id,
  type,
  placeholder,
  value,
  ref,
  label,
  className,
  defaultValue,
  required,
  minLength,
}: Props) => {
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
        placeholder={placeholder}
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        required={required}
        minLength={minLength}
      />
      <label htmlFor={id}>{label}</label>
      {type === "password" && (
        <IconWrapper
          onClick={() => setIsPasswordVisible((currentState) => !currentState)}
          className={"toggleHide"}
        >
          <EyeIcon isVisible={isPasswordVisible} />
        </IconWrapper>
      )}
    </div>
  );
};

export default InputWithLabel;
