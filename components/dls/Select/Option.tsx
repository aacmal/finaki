import classNames from "classnames";
import React, { useContext, useEffect, use } from "react";
import { SelectContext, SelectContextType } from "./Select";

type Props = {
  children: React.ReactNode;
  value: string | null;
  className?: string;
  selected?: boolean;
};

const Option = ({ children, value, className, selected }: Props) => {
  const { setSelected } = useContext(SelectContext) as SelectContextType;

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setSelected({
          value,
          label: children as string,
        });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames({
        "p-1 dark:hover:bg-slate-400/30 rounded-md hover:bg-slate-200/50":
          !className,
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
