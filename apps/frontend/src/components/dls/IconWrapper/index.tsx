import React from "react";
import classNames from "classnames";

type IconWrapperProps = {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
  onClick?: () => void;
};

const IconWrapper = ({
  children,
  className,
  onClick,
  withPadding = false,
}: IconWrapperProps) => {
  return (
    <div
      className={classNames(
        { "w-6": !withPadding },
        { "w-10 p-3": withPadding },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
