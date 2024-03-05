import classNames from "classnames";

type HeadingTextProps = {
  children: React.ReactNode;
  className?: string;
  fontWeight?: "normal" | "medium" | "bold" | "extrabold";
  isItalic?: boolean;
  isUnderline?: boolean;
  defaultColor?: "bright" | "dark";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
};

const Heading = ({
  children,
  className,
  defaultColor = "dark",
  level,
  fontWeight = "bold",
  isItalic = false,
  isUnderline = false,
  gradient = false,
}: HeadingTextProps) => {
  return (
    <div
      role="heading"
      aria-level={level}
      className={classNames(
        {
          "text-stone-700 dark:text-slate-200":
            defaultColor === "dark" && !gradient,
        },
        { "text-gray-100": defaultColor === "bright" },

        { "text-xl lg:text-2xl": level === 1 },
        { "text-lg lg:text-xl": level === 2 },
        { "text-base lg:text-lg": level === 3 },
        { "text-base": level === 4 },
        { "text-sm": level === 5 },
        { "text-xs": level === 6 },

        { "font-extrabold": fontWeight === "extrabold" },
        { "font-bold": fontWeight === "bold" },
        { "font-semibold": fontWeight === "medium" },
        { "font-normal": fontWeight === "normal" },
        { italic: isItalic },
        { underline: isUnderline },

        className,
      )}
    >
      {children}
    </div>
  );
};

export default Heading;
