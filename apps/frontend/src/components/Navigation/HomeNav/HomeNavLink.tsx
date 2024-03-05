import React from "react";
import Link from "next/link";
import classNames from "classnames";

type Props = {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  type?: "primary" | "secondary";
  className?: string;
};

const HomeNavLink = ({
  children,
  isActive,
  href,
  type = "primary",
  className,
}: Props) => {
  return (
    <Link
      className={classNames(
        "block rounded-md px-4 py-2 text-center",
        {
          "border border-blue-500 font-medium text-blue-500 dark:border-2 dark:border-blue-400 dark:text-blue-400":
            type === "secondary",
        },
        {
          "bg-transparent text-gray-800 hover:bg-blue-100 hover:text-blue-500 dark:text-slate-200 dark:hover:bg-blue-500/60 dark:hover:text-white":
            !isActive && type === "primary",
        },
        { "bg-blue-500 text-white": isActive },
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default HomeNavLink;
