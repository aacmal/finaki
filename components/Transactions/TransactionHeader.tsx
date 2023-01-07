import React from "react";

type Props = {};

const TransactionHeader = (props: Props) => {
  return (
    <div className="flex gap-2 w-full mb-5 px-4 py-3 border-b border-gray-400 font-medium text-sm text-slate-800 dark:text-slate-300">
      <div className="w-[14%] hidden lg:block">Waktu</div>
      <div className="w-[40%] lg:w-[30%]">Deskripsi</div>
      <div className="w-[10%] text-center">Kategori</div>
      <div className="w-[35%] lg:w-[15%] text-right">Jumlah (Rp.)</div>
    </div>
  );
};

export default TransactionHeader;
