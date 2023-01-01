import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AuthCardContent = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        "flex flex-col justify-evenly pb-10 lg:pt-16 px-6 md:px-10 w-full lg:gap-0 gap-9 lg:w-[40%] h-fit lg:h-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AuthCardContent;
