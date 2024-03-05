import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  width?: string;
  height?: number;
  className?: string;
  border?: boolean;
  theme?: "default" | "transparent";
};

const DashboardContentWrapper = ({
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
          "rounded-3xl p-3 lg:p-5  lg:px-7": theme === "default",

          "bg-transparent !text-slate-50": theme === "transparent",
          "bg-white/70 shadow-xl shadow-zinc-200/60 dark:bg-slate-700 dark:shadow-slate-800":
            theme === "default",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DashboardContentWrapper;
