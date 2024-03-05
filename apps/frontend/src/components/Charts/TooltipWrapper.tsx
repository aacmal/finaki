import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TooltipWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        "rounded-xl border border-slate-200 bg-white p-4 text-gray-500 shadow-lg dark:border-slate-500 dark:bg-slate-600 dark:text-gray-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TooltipWrapper;
