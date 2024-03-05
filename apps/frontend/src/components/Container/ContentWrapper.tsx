import React from "react";
import classNames from "classnames";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const ContentWrapper = ({ className, children }: Props) => {
  return (
    <div
      className={classNames(
        "mt-4 rounded-2xl bg-white p-5 shadow-xl shadow-zinc-200/40 dark:bg-slate-700 dark:text-slate-200 dark:shadow-slate-800",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
