import { currencyFormat } from "@/utils/currencyFormat";
import TooltipWrapper from "../TooltipWrapper";
import {PIE_CHART} from "@/components/Charts/constant";

const renderPieTooltip = ({ active, payload }: any) => {
  console.log(active)
  console.log(payload)
  if (active) {
    return (
      <TooltipWrapper>
        <p
          className="font-semibold"
          style={{
            color: payload[0].payload.color.includes("#")
                ? payload[0].payload.color
                : (PIE_CHART as any)[payload[0].payload.color]
          }}>
            {payload[0].name}
        </p>
        <p>
          {currencyFormat(payload[0].value)}
        </p>
      </TooltipWrapper>
    );
  }
};
export default renderPieTooltip;
