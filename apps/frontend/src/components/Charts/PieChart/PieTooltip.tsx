import { currencyFormat } from "@/utils/currencyFormat";

import { PIE_CHART } from "../constant";
import TooltipWrapper from "../TooltipWrapper";

const renderPieTooltip = ({ active, payload }: any) => {
  if (active) {
    return (
      <TooltipWrapper>
        <p
          className="font-semibold"
          style={{
            color: payload[0].payload.color.includes("#")
              ? payload[0].payload.color
              : (PIE_CHART as any)[payload[0].payload.color],
          }}
        >
          {payload[0].name}
        </p>
        <p>{currencyFormat(payload[0].value)}</p>
      </TooltipWrapper>
    );
  }
};
export default renderPieTooltip;
