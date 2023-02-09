import * as RadixDropdown from "@radix-ui/react-dropdown-menu";

interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  onOpenChange?: (open: boolean) => void;
}

const DropdownMenu = ({
  trigger,
  children,
  align = "end",
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
          sideOffset={-5}
          alignOffset={-15}
          className="py-1 px-1 bg-white shadow-xl rounded-lg text-sm"
        >
          {children}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
};

export default DropdownMenu;
