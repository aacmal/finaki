import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  width?: string;
  height?: number;
  className?: string;
  border?: boolean;
};

const ChartContainer = ({ border = false, className, children }: Props) => {
  return (
    <div
      className={classNames(
        "p-3 lg:p-5 rounded-3xl bg-white/70 dark:bg-slate-700 shadow-xl shadow-zinc-200/60 dark:shadow-slate-800 lg:px-7",
        { "border-2 border-gray-200": border },
        className
      )}
    >
      {children}
    </div>
  );
};

export default ChartContainer;
