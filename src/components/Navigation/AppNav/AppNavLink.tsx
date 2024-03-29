import IconWrapper from "../../dls/IconWrapper";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
};

const AppNavLink = ({ href, children, icon, active = false }: NavLinkProps) => {
  return (
    <Link href={href}>
      <div
        className={classNames(
          "flex gap-4 items-center px-4 py-4 lg:px-6 lg:py-4 rounded-2xl transition-all duration-100 border border-transparent",
          {
            "bg-blue-500 text-white shadow-xl shadow-blue-200 dark:shadow-blue-800":
              active,
          },
          {
            "hover:border-blue-500 hover:text-blue-500 text-stone-700 dark:text-slate-300 dark:hover:text-blue-500":
              !active,
          }
        )}
      >
        <IconWrapper>{icon}</IconWrapper>
        <span className="font-bold hidden lg:block">{children}</span>
      </div>
    </Link>
  );
};

export default AppNavLink;
