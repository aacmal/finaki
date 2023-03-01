import Heading from "@/dls/Heading";
import classNames from "classnames";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const ContentWrapper = ({ className, children }: Props) => {
  return (
    <div
      className={classNames(
        "p-5 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-2xl shadow-xl shadow-zinc-200/40 dark:shadow-slate-800 mt-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
