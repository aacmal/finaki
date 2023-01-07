import classNames from "classnames";

type HeadingTextProps = {
  children: React.ReactNode;
  className?: string;
  fontWeight?: "normal" | "medium" | "bold" | "extrabold";
  isItalic?: boolean;
  isUnderline?: boolean;
  defaultColor?: "bright" | "dark";
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

const Heading = ({
  children,
  className,
  defaultColor = "dark",
  level,
  fontWeight = "bold",
  isItalic = false,
  isUnderline = false,
}: HeadingTextProps) => {
  return (
    <div
      role="heading"
      aria-level={level}
      className={classNames(
        { "text-stone-700 dark:text-slate-200": defaultColor === "dark" },
        { "text-gray-100": defaultColor === "bright" },

        { "lg:text-2xl text-xl": level === 1 },
        { "lg:text-xl text-lg": level === 2 },
        { "lg:text-lg text-base": level === 3 },
        { "text-base": level === 4 },
        { "text-sm": level === 5 },
        { "text-xs": level === 6 },

        { "font-extrabold": fontWeight === "extrabold" },
        { "font-bold": fontWeight === "bold" },
        { "font-semibold": fontWeight === "medium" },
        { "font-normal": fontWeight === "normal" },
        { italic: isItalic },
        { underline: isUnderline },

        className
      )}
    >
      {children}
    </div>
  );
};

export default Heading;
