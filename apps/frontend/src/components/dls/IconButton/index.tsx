import React from "react";
import classNames from "classnames";

import IconWrapper from "../IconWrapper";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shape?: "circle" | "square";
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const IconButton = ({
  children,
  className,
  shape = "square",
  onClick,
  ...props
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "rounded p-1",
        {
          "!rounded-full": shape === "circle",
        },
        className,
      )}
      type="button"
      {...props}
    >
      <IconWrapper className="w-5">{children}</IconWrapper>
    </button>
  );
};

export default IconButton;
