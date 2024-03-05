import { useState } from "react";

import Button from "../../../components/dls/Button/Button";
import ExportTransactionModal from "../../../components/Transactions/ExportTransactionModal";

const ExportPDF = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        type="button"
        className="whitespace-nowrap !rounded-md !py-2 !text-sm font-semibold"
        width="fit"
        onClick={() => setIsOpen(true)}
      >
        Export PDF
      </Button>
      <ExportTransactionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ExportPDF;
