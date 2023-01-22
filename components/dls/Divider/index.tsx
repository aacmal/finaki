import classNames from "classnames";
import React from "react";

type Props = {
  vertical?: boolean;
  horizontal?: boolean;
  className?: string;
};

const Divider = ({ vertical, horizontal, className }: Props) => {
  return (
    <div
      className={classNames(
        "bg-gray-400",
        {
          "h-full w-px": vertical,
        },
        {
          "h-px w-full": horizontal,
        },
        className
      )}
    ></div>
  );
};

export default Divider;
