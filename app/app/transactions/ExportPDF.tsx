import ExportTransactionModal from "@/components/Transactions/ExportTransactionModal";
import Button from "@/dls/Button/Button";
import React, { useState } from "react";

const ExportPDF = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        type="button"
        className="!py-2 !text-sm whitespace-nowrap font-semibold !rounded-md"
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
