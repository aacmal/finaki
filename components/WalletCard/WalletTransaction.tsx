import Heading from "@/dls/Heading";
import { Transaction } from "@/types/Transaction";
import React from "react";
import { SimpleTransactionItem } from "../Transactions/TransactionItem";

type Props = {
  transactions: Transaction[] | undefined;
};

const WalletTransaction = (props: Props) => {
  if (!props.transactions) return <></>;

  return (
    <div className="mt-5">
      <Heading level={3} fontWeight="medium" defaultColor="bright">
        Riwayat Transaksi
      </Heading>
      <div className="py-1 px-3 bg-white/20 flex flex-col rounded-xl mt-2 text-white">
        {props.transactions.length > 0 ? (
          props.transactions?.map((transaction, index) => {
            return (
              <SimpleTransactionItem
                key={transaction._id}
                isLastItem={index === props.transactions?.length! - 1}
                transaction={transaction}
                theme="light"
              />
            );
          })
        ) : (
          <div className="text-center text-slate-50">Tidak ada transaksi</div>
        )}
      </div>
    </div>
  );
};

export default WalletTransaction;
