import TooltipWrapper from "../TooltipWrapper";

const renderPieTooltip = ({ active, payload }: any) => {
  if (active) {
    return (
      <TooltipWrapper>
        <p className="text-gray-500 font-sm">{payload[0].name}</p>
        <p className="text-gray-500 font-medium">{`Rp. ${payload[0].value}`}</p>
      </TooltipWrapper>
    );
  }
};
export default renderPieTooltip;