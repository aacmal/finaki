import React, { useContext } from "react";
import { SelectContext, SelectContextType } from "./Select";

type Props = {
  children: React.ReactNode;
  value: string;
};

const Option = ({ children, value }: Props) => {
  const { setSelected } = useContext(SelectContext) as SelectContextType;

  return (
    <div
      className="p-1 dark:hover:bg-slate-400/30 rounded-md"
      onClick={() => setSelected(value)}
      role="listitem"
    >
      {children}
    </div>
  );
};

export default Option;
