import {
  Portal,
  Sub,
  SubContent,
  SubTrigger,
} from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";

import styles from "./DropdownItem.module.scss";

interface Props extends React.ComponentProps<typeof Sub> {
  trigger: React.ReactNode;
  iconTrigger?: React.ReactNode;
  className?: string;
}

const DropdownSubMenu = ({
  children,
  trigger,
  iconTrigger,
  className,
}: Props) => {
  return (
    <Sub>
      <SubTrigger asChild>
        <div
          className={classNames(
            styles.dropdownItem,
            "relative cursor-default rounded px-2 py-1 hover:bg-blue-100 dark:hover:bg-blue-500/50",
            { "pl-7": !!iconTrigger },
            className,
          )}
        >
          {iconTrigger && (
            <div className={styles.itemIndicator}>{iconTrigger}</div>
          )}
          {trigger}
        </div>
      </SubTrigger>
      <Portal>
        <SubContent className="rounded-lg border border-slate-200 bg-white px-1 py-2 text-sm text-inherit text-slate-600 shadow-xl animate-in zoom-in-75 slide-in-from-left-12 dark:border-slate-500 dark:bg-slate-600 dark:text-slate-200">
          {children}
        </SubContent>
      </Portal>
    </Sub>
  );
};

export default DropdownSubMenu;
