import {
  Portal,
  Sub,
  SubContent,
  SubTrigger,
} from "@radix-ui/react-dropdown-menu";

import styles from "./DropdownItem.module.scss";
import classNames from "classnames";

interface Props extends React.ComponentProps<typeof Sub> {
  trigger: React.ReactNode;
  iconTrigger?: React.ReactNode;
  className?: string
}

const DropdownSubMenu = ({ children, trigger, iconTrigger, className }: Props) => {
  return (
    <Sub>
      <SubTrigger asChild>
        <div className={classNames(styles.dropdownItem, "py-1 px-2 rounded hover:bg-blue-100 dark:hover:bg-blue-500/50 relative cursor-default", {"pl-7": !!iconTrigger}, className)}>
          {iconTrigger && (
            <div className={styles.itemIndicator}>{iconTrigger}</div>
          )}
          {trigger}
        </div>
      </SubTrigger>
      <Portal>
        <SubContent className="py-2 px-1 border dark:text-slate-200 text-slate-600 text-inherit border-slate-200 bg-white dark:bg-slate-600 dark:border-slate-500 shadow-xl rounded-lg text-sm animate-in zoom-in-75 slide-in-from-left-12">
          {children}
        </SubContent>
      </Portal>
    </Sub>
  );
};

export default DropdownSubMenu;
