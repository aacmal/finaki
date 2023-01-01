import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthCard = ({ children }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row items-center h-full">
      {children}
    </div>
  );
};

export default AuthCard;
