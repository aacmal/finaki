import classNames from "classnames";
import React from "react";
import IconWrapper from "../IconWrapper";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const IconButton = ({ children, className, onClick, ...props }: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames("rounded p-1", className)}
      type="button"
      {...props}
    >
      <IconWrapper className="w-5">{children}</IconWrapper>
    </button>
  );
};

export default IconButton;
