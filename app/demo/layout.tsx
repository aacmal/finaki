import { getUserData } from "@/api/user";
import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import AppNav from "@/components/Navigation/AppNav/AppNav";
import TransferBalanceDialog from "@/components/WalletCard/TransferBalanceDialog";
import TransactionDetail from "@/components/Transactions/TransactionDetail";
import DeleteWalletDialog from "@/components/WalletCard/DeleteWalletDialog";
import AddTransaction from "@/components/Transactions/AddTransaction";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <Container>
        <AppNav />
        <div className="flex flex-col w-full">
          <Header />
          <main>{children}</main>
        </div>
      </Container>
      <DeleteWalletDialog />
      <TransferBalanceDialog />
      <TransactionDetail />
      <AddTransaction />
    </>
  );
};

export default AppLayout;
