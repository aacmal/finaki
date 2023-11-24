import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TooltipWrapper = ({ children, className }: Props) => {
  return (
    <div className={classNames("bg-white border border-slate-200 dark:bg-slate-600 text-gray-500 dark:text-gray-100 dark:border-slate-500 p-4 rounded-xl shadow-lg", className)}>
      {children}
    </div>
  );
};

export default TooltipWrapper;
