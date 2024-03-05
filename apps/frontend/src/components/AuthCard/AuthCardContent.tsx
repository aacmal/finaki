import React from "react";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AuthCardContent = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        "flex h-fit w-full flex-col justify-evenly gap-9 pb-10 md:px-10 lg:h-full lg:w-[40%] lg:pt-16",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AuthCardContent;
