import IconButton from "@/dls/IconButton";
import ElipsisVerticalIcon from "@/icons/ElipsisVerticalIcon";
import PencilIcon from "@/icons/PencilIcon";
import TrashIcon from "@/icons/TrashIcon";
import React from "react";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
};

const TransactionOption = ({ onEdit, onDelete, onSave }: Props) => {
  return (
    <div className="flex-1 text-center lg:invisible lg:group-hover:visible">
      <div className="hidden lg:flex gap-3 justify-center">
        <IconButton
          onClick={onEdit}
          className="text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          <PencilIcon />
        </IconButton>
        <IconButton
          onClick={onDelete}
          className="text-red-500 hover:bg-red-500 hover:text-white"
        >
          <TrashIcon />
        </IconButton>
      </div>
      <IconButton className="lg:hidden">
        <ElipsisVerticalIcon strokeWidth={2} stroke="currentColor" />
      </IconButton>
    </div>
  );
};

export default TransactionOption;
