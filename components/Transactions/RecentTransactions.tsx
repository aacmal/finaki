import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import ArrowCircleIcon from "@/icons/ArrowCircleIcon";
import classNames from "classnames";
import React from "react";
import List from "./List";

type RecentTransactionsProps = {
  data: any[];
};

const RecentTransactions = ({ data }: RecentTransactionsProps) => {
  return (
    <div className="flex-1 p-4 lg:p-7 bg-white/70 shadow-xl shadow-zinc-200/60 rounded-xl">
      <Heading fontWeight="medium" level={2} className="mb-4">
        Transkasi terbaru
      </Heading>
      {/* <div className="flex w-full py-3 border-b">
            <span className='font-bold flex-1'>Nama</span>
            <span className='font-bold w-4/12'>Kategori</span>
            <span className='font-bold'>Nominal</span>
          </div> */}
      <ul>
        {data.map((transaction, index) => (
          <List
            key={index}
            index={index}
            name={transaction.name}
            type={transaction.type}
            date={transaction.date}
            hour={transaction.hour}
            value={transaction.value}
            length={data.length}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
