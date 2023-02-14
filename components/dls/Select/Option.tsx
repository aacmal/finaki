import classNames from "classnames";
import React, { useContext } from "react";
import { SelectContext, SelectContextType } from "./Select";

type Props = {
  children: React.ReactNode;
  value: string;
  className?: string;
};

const Option = ({ children, value, className }: Props) => {
  const { setSelected } = useContext(SelectContext) as SelectContextType;

  return (
    <div
      className={classNames({
        "p-1 dark:hover:bg-slate-400/30 rounded-md": !className,
        [className as string]: className,
      })}
      onClick={() =>
        setSelected({
          value,
          label: children as string,
        })
      }
      role="listitem"
    >
      {children}
    </div>
  );
};

export default Option;
