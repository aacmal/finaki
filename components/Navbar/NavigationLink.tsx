import classNames from "classnames";
import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  type?: "primary" | "secondary";
  className?: string;
};

const NavigationLink = ({
  children,
  isActive,
  href,
  type = "primary",
  className,
}: Props) => {
  return (
    <Link
      className={classNames(
        "px-4 py-2 rounded-md",
        {
          "text-blue-500 border-blue-500 dark:border-blue-400 dark:text-blue-400 font-medium dark:border-2 border":
            type === "secondary",
        },
        {
          "hover:bg-blue-100 dark:hover:bg-blue-500/60 dark:text-slate-200 dark:hover:text-white hover:text-blue-500 bg-transparent text-gray-800":
            !isActive && type === "primary",
        },
        { "bg-blue-500 text-white": isActive },
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
