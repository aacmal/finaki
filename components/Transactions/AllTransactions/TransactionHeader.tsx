import React from "react";

type Props = {};

const TransactionHeader = (props: Props) => {
  return (
    <thead>
      <tr className="!mb-5 px-4 py-3 border-b border-gray-400 text-slate-800 dark:text-slate-300">
        <th align="left" className="hidden lg:table-cell font-medium text-sm">
          Waktu
        </th>
        <th className="font-medium text-sm py-3 mb-3 w-32 md:w-60 text-left lg:text-center lg:w-96">
          Deskripsi
        </th>
        <th className="font-medium text-sm">Dompet</th>
        <th align="right" className="font-medium text-sm">
          Jumlah (Rp.)
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TransactionHeader;
