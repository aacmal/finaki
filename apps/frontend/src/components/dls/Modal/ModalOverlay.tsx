import classNames from "classnames";

type Props = {
  onClick?: () => void;
  className?: string;
};

const ModalOverlay = ({ onClick, className }: Props) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "absolute left-0 top-0 z-[51] h-screen w-screen bg-slate-400/20 dark:bg-black/40",
        className,
      )}
    ></div>
  );
};

export default ModalOverlay;
