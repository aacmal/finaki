import React, { useContext, useEffect } from "react";
import classNames from "classnames";

import { SelectContext, SelectContextType } from "./Select";

type Props = {
  children: React.ReactNode;
  value: string | null;
  selected?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Option = ({ children, value, selected, ...props }: Props) => {
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
      className={classNames(
        "rounded-md p-1 hover:bg-slate-200/50 dark:hover:bg-slate-400/30",
      )}
      onClick={() =>
        setSelected({
          value,
          label: children as string,
        })
      }
      role="listitem"
      {...props}
    >
      {children}
    </div>
  );
};

export default Option;
