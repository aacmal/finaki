import MyWallets from "./MyWallets";

type Props = {};

export const metadata = {
  title: "Semua Dompet",
  description: "Semua dompet saya",
};

const AllWalletsPage = (props: Props) => {
  return <MyWallets />;
};

export default AllWalletsPage;
