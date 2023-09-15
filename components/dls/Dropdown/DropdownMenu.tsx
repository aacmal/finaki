import * as RadixDropdown from "@radix-ui/react-dropdown-menu";

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (open: boolean) => void;
  sideOffset?: number;
  alignOffset?: number;
}

const DropdownMenu = ({
  trigger,
  children,
  align = "end",
  sideOffset = -5,
  alignOffset = -15,
  onOpenChange,
}: Props) => {
  return (
    <RadixDropdown.Root onOpenChange={onOpenChange}>
      <RadixDropdown.Trigger asChild>
        <div>{trigger}</div>
      </RadixDropdown.Trigger>
      <RadixDropdown.Portal>
        <RadixDropdown.Content
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className="py-1 px-1 bg-white shadow-xl rounded-lg text-sm"
        >
          {children}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
};

export default DropdownMenu;
