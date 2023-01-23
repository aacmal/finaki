"use client";

import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import ArrowCircleIcon from "@/icons/ArrowCircleIcon";
import { Transaction, TransactionData } from "@/types/Transaction";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import List from "./List";

type RecentTransactionsProps = {
  data: Transaction[] | undefined;
};

const RecentTransactions = ({ data }: RecentTransactionsProps) => {
  if (!data) return <></>;

  return (
    <div className="flex-1 p-4 lg:p-7 bg-white/70 dark:bg-slate-700 shadow-xl shadow-zinc-200/60 dark:shadow-slate-800 rounded-3xl">
      <Heading fontWeight="medium" level={2} className="mb-4">
        Transkasi terbaru
      </Heading>
      {/* <div className="flex w-full py-3 border-b">
            <span className='font-bold flex-1'>Nama</span>
            <span className='font-bold w-4/12'>Kategori</span>
            <span className='font-bold'>Nominal</span>
          </div> */}
      <ul>
        {data.map((transaction, index) => {
          return (
            <List
              key={transaction._id}
              index={index}
              description={transaction.description}
              type={transaction.type}
              createdAt={transaction.createdAt}
              amount={transaction.amount}
              length={4}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTransactions;
