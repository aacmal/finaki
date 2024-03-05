import React from "react";
import classNames from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={classNames(
        "max-w mx-auto flex max-w-7xl gap-5 px-3 pb-32 lg:pb-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
