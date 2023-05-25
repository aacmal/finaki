import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className? : string;
};

const AuthCard = ({ children, className }: Props) => {
  return (
    <div className={classNames("flex flex-col lg:flex-row items-center max-w-6xl w-[90%] lg:h-[60%] h-fit p-4 bg-white dark:bg-slate-600  dark:shadow-slate-800 rounded-2xl shadow-2xl shadow-slate-200", className)}>
      {children}
    </div>
  );
};

export default AuthCard;
