import IconWrapper from "@/dls/IconWrapper";
import ArrowCircleIcon from "@/icons/ArrowCircleIcon";
import classNames from "classnames";
import React from "react";

type ListProps = {
  index: number;
  length: number;
  type: "in" | "out";
  name: string;
  date: string;
  hour: string;
  value: number;
};

const List = ({ index, length, type, name, date, hour, value }: ListProps) => {
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
        {name}
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
        {type === "in" ? "+" : "-"}Rp. {value}
      </span>
    </li>
  );
};

export default List;
