import IconButton from "@/dls/IconButton";
import ArrowsIcon from "@/icons/ArrowsIcon";
import ElipsisVerticalIcon from "@/icons/ElipsisVerticalIcon";
import PlusIcon from "@/icons/PlusIcon";
import React from "react";

type Props = {};

const WalletOption = (props: Props) => {
  return (
    <div className="flex justify-center gap-4 mt-3">
      <IconButton shape="circle" className="bg-white/40 text-slate-50 !p-2">
        <PlusIcon strokeWidth={2} />
      </IconButton>
      <IconButton shape="circle" className="bg-white/40 text-slate-50 !p-2">
        <ArrowsIcon strokeWidth={0.5} fill="currentColor" />
      </IconButton>
      <IconButton shape="circle" className="bg-white/40 text-slate-50 !p-2">
        <ElipsisVerticalIcon className=" transform rotate-90" />
      </IconButton>
    </div>
  );
};

export default WalletOption;
