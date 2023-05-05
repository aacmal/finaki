import classNames from "classnames";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={classNames(
        "max-w-7xl max-w mx-auto flex gap-5 lg:pb-5 pb-32 px-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
