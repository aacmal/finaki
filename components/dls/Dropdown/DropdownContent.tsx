import { Content, SubContent } from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";

interface Content extends React.ComponentProps<typeof Content> {}
interface SubContent extends React.ComponentProps<typeof SubContent> {}

const DropdownContent = ({
  children,
  className,
  align = "end",
  side = "bottom",
  ...props
}: Content) => {
  return (
    <Content
      className={classNames(
        "py-2 px-1 bg-white shadow-xl rounded-lg text-sm",
        className
      )}
      align={align}
      side={side}
      {...props}
    >
      {children}
    </Content>
  );
};
