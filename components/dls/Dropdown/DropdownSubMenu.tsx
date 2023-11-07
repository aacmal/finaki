import {
  Portal,
  Sub,
  SubContent,
  SubTrigger,
} from "@radix-ui/react-dropdown-menu";

import styles from "./DropdownItem.module.scss";

interface Props extends React.ComponentProps<typeof Sub> {
  trigger: React.ReactNode;
  iconTrigger?: React.ReactNode;
}

const DropdownSubMenu = ({ children, trigger, iconTrigger }: Props) => {
  return (
    <Sub>
      <SubTrigger asChild>
        <div className={styles.dropdownItem}>
          {iconTrigger && (
            <div className={styles.itemIndicator}>{iconTrigger}</div>
          )}
          {trigger}
        </div>
      </SubTrigger>
      <Portal>
        <SubContent className="py-2 px-1 bg-white shadow-xl rounded-lg text-sm animate-in zoom-in-75 slide-in-from-left-12">
          {children}
        </SubContent>
      </Portal>
    </Sub>
  );
};

export default DropdownSubMenu;
