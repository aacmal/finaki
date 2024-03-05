import React from "react";
import Link from "next/link";
import classNames from "classnames";

import IconWrapper from "../../dls/IconWrapper";

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
          "flex items-center gap-4 rounded-2xl border border-transparent px-4 py-4 transition-all duration-100 lg:px-6 lg:py-4",
          {
            "bg-blue-500 text-white shadow-xl shadow-blue-200 dark:shadow-blue-800":
              active,
          },
          {
            "text-stone-700 hover:border-blue-500 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-500":
              !active,
          },
        )}
      >
        <IconWrapper>{icon}</IconWrapper>
        <span className="hidden font-bold lg:block">{children}</span>
      </div>
    </Link>
  );
};

export default AppNavLink;
