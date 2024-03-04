import React from "react";
import style from "./Hamburger.module.css";
import classNames from "classnames";

type Props = {
  className?: string;
  isOpen: boolean;
};

const Hamburger = ({ className, isOpen }: Props) => {
  return (
    <label className={classNames(style.hamburgerMenu, className)}>
      <span
        className={classNames("bg-slate-700 dark:bg-slate-100", {
          [String(style.st)]: isOpen,
        })}
      ></span>
      <span
        className={classNames("bg-slate-700 dark:bg-slate-100", {
          [String(style.nd)]: isOpen,
        })}
      ></span>
      <span
        className={classNames("bg-slate-700 dark:bg-slate-100", {
          [String(style.rd)]: isOpen,
        })}
      ></span>
    </label>
  );
};

export default Hamburger;
