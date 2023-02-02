"use cleint";

import LoadingButton from "@/dls/Button/LoadingButton";
import InputWithLabel from "@/dls/Form/InputWithLabel";
import Heading from "@/dls/Heading";
import IconWrapper from "@/dls/IconWrapper";
import { Modal, ModalCloseTringger, ModalContent } from "@/dls/Modal";
import ModalTrigger from "@/dls/Modal/ModalTrigger";
import XmarkIcon from "@/icons/XmarkIcon";

type Props = {};

const AddNewWallet = (props: Props) => {
  return (
    <Modal>
      <ModalTrigger>
        <div className="dark:text-slate-800 font-medium dark:bg-slate-50 px-3 py-2 rounded-lg w-auto">
          Tambah dompet
        </div>
      </ModalTrigger>
      <ModalContent>
        <div className="flex items-center justify-between">
          <Heading className="text-slate-700" level={3}>
            Tambah Dompet
          </Heading>
          <ModalCloseTringger>
            <IconWrapper className="text-blue-500 cursor-pointer rounded hover:bg-blue-100 dark:hover:bg-blue-500/20">
              <XmarkIcon />
            </IconWrapper>
          </ModalCloseTringger>
        </div>
        <form action="">
          <div className="mt-8 space-y-8">
            <InputWithLabel
              label="Nama Dompet"
              id="wallet-name"
              type="text"
              placeholder="Dompet Utama"
              required
            />
            <InputWithLabel
              label="Saldo Awal"
              id="wallet-balance"
              type="number"
              placeholder="Rp. 12000 (opsional)"
            />
            <LoadingButton
              title="Tambah Dompet"
              isLoading={false}
              onLoadingText="Menambahkan dompet"
              isSuccess={false}
              onSuccessText="Dompet berhasil ditambahkan"
            />
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddNewWallet;
