import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TooltipWrapper = ({ children, className }: Props) => {
  return (
    <div className={classNames("bg-white p-4 rounded-xl shadow-lg", className)}>
      {children}
    </div>
  );
};

export default TooltipWrapper;
