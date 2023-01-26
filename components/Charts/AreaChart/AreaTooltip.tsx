import TooltipWrapper from "../TooltipWrapper";

const renderAreaTooltip = ({ active, payload }: any) => {
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
        <p className="text-gray-500 font-sm">{date}</p>
        <p className="text-gray-500 font-medium">{`Rp. ${payload[0].value}`}</p>
      </TooltipWrapper>
    );
  }
};

export default renderAreaTooltip;
