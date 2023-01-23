import IconWrapper from "@/dls/IconWrapper";
import ArrowCircleIcon from "@/icons/ArrowCircleIcon";
import classNames from "classnames";
import React from "react";

type ListProps = {
  index: number;
  length: number;
  type: string;
  description: string;
  createdAt: string;
  amount: number;
};

const List = ({
  index,
  length,
  type,
  description,
  createdAt,
  amount,
}: ListProps) => {
  const date = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
  const hour = new Date(createdAt).toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <li
      className={classNames("flex w-full py-3 items-center", {
        "border-b dark:border-slate-500": index !== length - 1,
      })}
    >
      <span>
        <IconWrapper className="w-7 mr-7">
          <ArrowCircleIcon
            direction={type === "in" ? "up" : "down"}
            className={classNames(
              { "text-blue-500": type === "in" },
              { "text-orange-500": type === "out" }
            )}
          />
        </IconWrapper>
      </span>
      <span className="w-[30%] lg:w-[40%] font-medium dark:text-slate-200">
        {description}
      </span>
      <span></span>
      <span className="flex flex-col">
        <span className="font-medium text-sm md:text-base dark:text-slate-200">
          {date}
        </span>
        <span className="text-xs md:text-base dark:text-slate-400 text-slate-500">
          {hour}
        </span>
      </span>
      <span
        className={classNames(
          "font-medium  ml-auto",
          { "text-blue-500": type === "in" },
          { "text-orange-500": type === "out" }
        )}
      >
        {type === "in" ? "+" : "-"}Rp. {amount}
      </span>
    </li>
  );
};

export default List;
