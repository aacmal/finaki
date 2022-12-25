import classNames from "classnames";
import React from "react";

type Props = {
  type: "text" | "number" | "password";
  placeholder: string;
  value?: string | number;
  ref?: React.RefObject<HTMLInputElement>;
  className?: string;
  transparent?: boolean;
  onChange?: (value: string) => void;
};

const Input = ({
  type,
  placeholder,
  value,
  ref,
  transparent,
  className,
  onChange,
}: Props) => {
  return (
    <input
      type={type}
      className={classNames(
        "w-full py-1 px-2 rounded-md",
        {
          "bg-transparent": transparent,
        },
        className
      )}
      defaultValue={value}
    />
  );
};

export default Input;
