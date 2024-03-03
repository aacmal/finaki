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
          className="py-1 px-1 bg-white text-slate-600 border border-slate-200 dark:bg-slate-600 dark:border-slate-500 dark:text-slate-200 shadow-xl rounded-lg text-sm animate-in zoom-in-75"
        >
          {children}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
};

export default DropdownMenu;
