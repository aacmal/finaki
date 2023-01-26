import { COLOR } from "../constant";
import TooltipWrapper from "../TooltipWrapper";

const renderBarTooltip = ({ active, payload }: any) => {
  if (active) {
    const date = new Date(payload[0]?.payload.timestamp).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
      }
    );
    return (
      <TooltipWrapper>
        <p className="text-gray-500 font-sm mb-2">{date}</p>
        <div className="flex items-center">
          <div
            style={{ backgroundColor: COLOR["INCOME"] }}
            className="h-2 w-2 rounded-full mr-2"
          ></div>
          <span className="text-sm text-slate-700">Rp. {payload[0].value}</span>
        </div>
        <div className="flex items-center">
          <div
            style={{ backgroundColor: COLOR["OUTCOME"] }}
            className="h-2 w-2 rounded-full mr-2"
          ></div>
          <span className="text-sm text-slate-700">Rp. {payload[1].value}</span>
        </div>
        {/* <p className="text-gray-500 font-sm">{date}</p>
        <p className="text-gray-500 font-medium">{`Rp. ${payload[0].value}`}</p> */}
      </TooltipWrapper>
    );
  }
};

export default renderBarTooltip;
