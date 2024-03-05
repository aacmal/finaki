const TransactionHeader = () => {
  return (
    <thead>
      <tr className="!mb-5 border-b border-gray-400 px-4 py-3 text-slate-800 dark:text-slate-300">
        <th align="left" className="hidden text-sm font-medium lg:table-cell">
          Waktu
        </th>
        <th className="mb-3 w-32 py-3 text-left text-sm font-medium md:w-60 lg:w-96 lg:text-center">
          Deskripsi
        </th>
        <th className="text-sm font-medium">Dompet</th>
        <th align="right" className="text-sm font-medium">
          Jumlah (Rp.)
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TransactionHeader;
