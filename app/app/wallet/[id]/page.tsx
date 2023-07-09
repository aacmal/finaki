import WalletById from "./WalletById";

export const metadata = {
  title: "Detail Dompet",
  description: "Detail dompet",
  robots: "noindex, nofollow",
};

type Props = {};

const WalletDetailPage = (props: Props) => {
  return <WalletById />;
};

export default WalletDetailPage;
