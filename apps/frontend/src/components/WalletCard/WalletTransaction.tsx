import { Transaction } from "@/types/Transaction";

import Heading from "../dls/Heading";
import { SimpleTransactionItem } from "../Transactions/TransactionItem";

type Props = {
  transactions: Transaction[] | undefined;
};

const WalletTransaction = (props: Props) => {
  if (!props.transactions)
    return (
      <div className="mt-5">
        <Heading level={3} fontWeight="medium" defaultColor="bright">
          Riwayat Transaksi
        </Heading>
        <div className="mt-2 flex flex-col space-y-4 rounded-xl bg-white/20 p-3 text-white">
          {Array(3)
            .fill("")
            .map((_, index) => (
              <div
                style={{
                  animationDelay: `${index * 300}ms`,
                }}
                key={index}
                className="h-16 w-full animate-pulse rounded-lg bg-white/30"
              ></div>
            ))}
        </div>
      </div>
    );

  return (
    <div className="mt-5">
      <Heading level={3} fontWeight="medium" defaultColor="bright">
        Riwayat Transaksi
      </Heading>
      <div className="mt-2 flex flex-col rounded-xl bg-white/20 px-3 py-1 text-white">
        {props.transactions.length > 0 ? (
          props.transactions?.map((transaction, index) => {
            return (
              <SimpleTransactionItem
                key={transaction._id}
                isLastItem={index === props.transactions!.length - 1}
                transaction={transaction}
                theme="light"
              />
            );
          })
        ) : (
          <div className="py-3 text-center text-slate-50">
            Tidak ada transaksi
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletTransaction;
