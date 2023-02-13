"use client";

import ChevronIcon from "@/icons/ChevronIcon";
import IconWrapper from "../IconWrapper";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { createContext, forwardRef } from "react";
import { useForm } from "react-hook-form";

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type SelectContextType = {
  isOpen: boolean;
  selectedValue: string | null;
  toggle: () => void;
  close: () => void;
  setSelected: (value: string) => void;
};

export const SelectContext = createContext<SelectContextType | null>(null);

const Select = forwardRef(function Select(
  { className, children, placeholder, ...props }: SelectProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function close() {
    setIsOpen(false);
  }

  function setSelected(value: string) {
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
          value: selectedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <div
      className="select bg-gray-100 relative text-slate-800 dark:text-slate-100 dark:bg-slate-500 px-3 w-32 py-4 whitespace-pre rounded-xl cursor-pointer focus:ring-2 dark:focus:ring-slate-400 outline-none transition-all duration-200"
      tabIndex={0}
      onClick={toggle}
    >
      <input
        aria-hidden="true"
        className="sr-only"
        ref={ref}
        {...props}
        value={props.value || ""}
      />
      <div className="flex items-center justify-between">
        <div className="capitalize">{selectedValue || placeholder}</div>
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
            "absolute p-1 bg-white shadow-xl text-slate-800 dark:text-slate-100 dark:bg-slate-500 top-16 left-0 w-full rounded-lg overflow-hidden transition-[max-height] ",
            { "max-h-0 max-w-0 p-0": !isOpen },
            { "max-h-96 max-w-96 p-1": isOpen }
          )}
        >
          {children}
        </div>
      </SelectContext.Provider>
    </div>
  );
});

export default Select;
