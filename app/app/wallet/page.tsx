import WalletCard from "@/components/WalletCard/WalletCard";
import Button from "@/dls/Button/Button";

type Props = {};

const WalletPage = (props: Props) => {
  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="font-semibold">
          Total saldo : <br />
          <span className="text-2xl">Rp 4.000.000</span>
        </div>
        <Button type="button" width="auto">
          Tambah dompet
        </Button>
      </div>
      <div className="mt-6 grid grid-cols-1  md:grid-cols-2  lg:grid-cols-3 gap-5">
        <WalletCard name="Dompet Utama" color="red" balance={1000000} />
        <WalletCard name="Tunai" color="orange" balance={1000000} />
        <WalletCard name="BCA" color="blue" balance={1000000} />
        <WalletCard name="OVO" color="purple" balance={1000000} isDefault />
      </div>
    </div>
  );
};

export default WalletPage;
