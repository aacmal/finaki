const renderPieLabel = (props: any) => {
  const { payload } = props;
  return (
    <ul>
      {payload.map((entry: any, index: number) => {
        const percent = (entry.payload.percent * 100).toFixed(1);
        return (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span style={{ color: entry.color }} className="font-semibold">
              {percent}%
            </span>
            <span className="dark:text-slate-300">{entry.value}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default renderPieLabel;