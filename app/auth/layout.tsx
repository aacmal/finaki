import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="grid place-items-center w-screen h-screen">
      <div className="max-w-6xl w-[90%] lg:h-[60%] h-fit p-4 bg-white rounded-2xl shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
