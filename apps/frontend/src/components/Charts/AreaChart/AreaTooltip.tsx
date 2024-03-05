import { currencyFormat } from "@/utils/currencyFormat";

import TooltipWrapper from "../TooltipWrapper";

const renderAreaTooltip = ({ active, payload }: any) => {
  if (active) {
    const date = new Date(payload[0]?.payload.timestamp).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
      },
    );
    return (
      <TooltipWrapper>
        <p className="font-sm">{date}</p>
        <p className="font-medium">{currencyFormat(payload[0].value)}</p>
      </TooltipWrapper>
    );
  }
};

export default renderAreaTooltip;
