import classNames from "classnames";
import React from "react";

type Props = {
  vertical?: boolean;
  horizontal?: boolean;
};

const Divider = ({ vertical, horizontal }: Props) => {
  return (
    <div
      className={classNames(
        "bg-gray-400",
        {
          "h-full w-px": vertical,
        },
        {
          "h-px w-full": horizontal,
        }
      )}
    ></div>
  );
};

export default Divider;
