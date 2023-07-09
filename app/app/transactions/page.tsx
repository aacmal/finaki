import AllTransactions from "./AllTransactions";

export const metadata = {
  title: "Semua Transaksi",
  description: "Semua transaksi",
};

type Props = {};
const TransactionsPage = (props: Props) => {
  return <AllTransactions />;
};

export default TransactionsPage;
