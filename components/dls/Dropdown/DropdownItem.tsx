import CheckIcon from "@/icons/CheckIcon";
import {
  CheckboxItem,
  Item,
  ItemIndicator,
  SubTrigger,
} from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";

import styles from "./DropdownItem.module.scss";
import React from "react";

interface ItemProps extends React.ComponentProps<typeof Item> {
  indicator?: React.ReactNode;
  icon?: React.ReactNode;
  shouldCloseAfterClick?: boolean;
}

interface CheckboxItemProps extends React.ComponentProps<typeof CheckboxItem> {
  children: React.ReactNode;
  className?: string;
  shouldCloseAfterClick?: boolean;
}

interface SubTriggerProps extends React.ComponentProps<typeof SubTrigger> {
  indicator?: React.ReactNode;
}

const DropdownItem = ({
  children,
  className,
  icon,
  shouldCloseAfterClick = false,
  onClick,
  ...props
}: ItemProps) => {
  return (
    <Item
      onClick={(e) => {
        // by default Dropdown menu will close after clicking on an item
        // but if we want to keep it open, we can pass shouldCloseAfterClick = false
        if (!shouldCloseAfterClick) {
          e.preventDefault();
        }
        if (onClick) {
          onClick(e);
        }
      }}
      className={classNames(styles.dropdownItem, "py-1 px-2 rounded hover:bg-blue-100 relative text-slate-600 cursor-default", {"pl-7": !!icon}, className)}
      {...props}
    >
      {icon && <div className={styles.itemIndicator}>{icon}</div>}
      {children}
    </Item>
  );
};

const DropdownCheckboxItem = ({
  children,
  className,
  shouldCloseAfterClick = false,
  onClick,
  ...props
}: CheckboxItemProps) => {
  return (
    <CheckboxItem
      onClick={(e) => {
        // by default Dropdown menu will close after clicking on an item
        // but if we want to keep it open, we can pass shouldCloseAfterClick = false
        if (!shouldCloseAfterClick) {
          e.preventDefault();
        }
        if (onClick) {
          onClick(e);
        }
      }}
      className={classNames(styles.dropdownItem, className)}
      {...props}
    >
      <ItemIndicator className={styles.itemIndicator}>
        <CheckIcon strokeWidth={2} />
      </ItemIndicator>
      {children}
    </CheckboxItem>
  );
};

const DropdownSubTrigger = ({
  children,
  className,
  indicator,
  ...props
}: SubTriggerProps) => {
  return (
    <SubTrigger
      className={classNames(styles.dropdownItem, className)}
      {...props}
    >
      {indicator && (
        <ItemIndicator className={styles.ItemIndicator}>
          {indicator}
        </ItemIndicator>
      )}
      {children}
    </SubTrigger>
  );
};

export { DropdownItem, DropdownSubTrigger, DropdownCheckboxItem };
