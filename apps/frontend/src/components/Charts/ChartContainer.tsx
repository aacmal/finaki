import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  width?: string;
  height?: number;
  className?: string;
  border?: boolean;
  theme?: "default" | "transparent";
};

const ChartContainer = ({
  border = false,
  className,
  children,
  theme = "default",
}: Props) => {
  return (
    <div
      className={classNames(
        { "border-2 border-gray-200": border },
        {
          "bg-white/70 dark:bg-slate-700 shadow-xl shadow-zinc-200/60 dark:shadow-slate-800 p-3 lg:p-5 rounded-3xl  lg:px-7":
            theme === "default",

          "bg-transparent !text-slate-50": theme === "transparent",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default ChartContainer;
