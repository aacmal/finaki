/* eslint-disable no-unused-vars */
"use client";

import ChevronIcon from "../../icons/ChevronIcon";
import classNames from "classnames";
import { createContext, forwardRef, useEffect, useState } from "react";
import IconWrapper from "../IconWrapper";
import Option from "./Option";

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  placeholder?: string;
  name: string;
  minWidth?: string;
  optional?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type SelectedValue = {
  value: string | null;
  label: string;
};

export type SelectContextType = {
  isOpen: boolean;
  selectedValue: SelectedValue | null;
  toggle: () => void;
  close: () => void;
  setSelected: (value: SelectedValue) => void;
};

export const SelectContext = createContext<SelectContextType | null>(null);

const Select = forwardRef(function Select(
  {
    className,
    children,
    placeholder,
    optional,
    disabled,
    ...props
  }: SelectProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<SelectedValue | null>(
    null
  );

  function toggle() {
    if (disabled) return;
    setIsOpen(!isOpen);
  }

  function close() {
    setIsOpen(false);
  }

  function setSelected(value: SelectedValue) {
    setSelectedValue(value);
    close();
  }

  useEffect(() => {
    // close the select when user clicks outside of the select
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".select")) {
        close();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedValue) {
      props.onChange?.({
        target: {
          name: props.name,
          value: selectedValue.value,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  useEffect(() => {
    if (props.value === undefined) {
      setSelectedValue({
        value: null,
        label: placeholder || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  return (
    <div
      className={classNames(
        "select bg-gray-100 relative text-slate-800 dark:text-slate-100 dark:bg-slate-500 px-3 w-auto py-4 whitespace-pre rounded-xl cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200",
        {
          "!bg-transparent ring-1 ring-gray-300": selectedValue?.value,
          "bg-gray-100": !selectedValue?.value,
        },
        className
      )}
      tabIndex={0}
      onClick={toggle}
    >
      <input
        aria-hidden="true"
        className="sr-only"
        ref={ref}
        onChange={props.onChange}
        name={props.name}
        onBlur={props.onBlur}
        required={props.required}
        value={props.value || ""}
      />
      <div
        className={classNames(
          "flex items-center gap-1 justify-between",
          props.minWidth
        )}
      >
        <div>{selectedValue?.value ? selectedValue.label : placeholder}</div>
        <IconWrapper className="w-4">
          <ChevronIcon
            className={classNames(
              "transform transition-transform duration-200",
              { "rotate-180": isOpen },
              { "rotate-0": !isOpen }
            )}
          />
        </IconWrapper>
      </div>
      <SelectContext.Provider
        value={{ setSelected, isOpen, selectedValue, toggle, close }}
      >
        <div
          role="list"
          className={classNames(
            "absolute overflow-auto p-1 bg-white shadow-xl text-slate-800 dark:text-slate-100 dark:bg-slate-500 top-16 left-0 w-full rounded-lg transition-[max-height] z-50",
            { "!max-h-0 !max-w-0 !p-0": !isOpen },
            { "max-h-96 max-w-96 p-1": isOpen }
          )}
        >
          {optional && <Option value={null}>Tidak Memilih</Option>}
          {children}
        </div>
      </SelectContext.Provider>
    </div>
  );
});

export default Select;
