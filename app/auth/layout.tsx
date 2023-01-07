import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="grid place-items-center w-screen h-screen">
      <div className="max-w-6xl w-[90%] lg:h-[60%] h-fit p-4 bg-white dark:bg-slate-600  dark:shadow-slate-800 rounded-2xl shadow-2xl shadow-slate-200">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
