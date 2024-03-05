const renderPieLabel = (props: any) => {
  const { payload } = props;
  let orderedPayload = payload.sort(
    (a: any, b: any) => b.payload.percent - a.payload.percent,
  );

  if (orderedPayload.length > 6) {
    orderedPayload = orderedPayload.slice(0, 5);
    const other = orderedPayload.reduce((acc: any, curr: any) => {
      return acc + curr.payload.percent;
    }, 0);

    orderedPayload.push({
      value: "Lainnya",
      color: "#57C5B6",
      payload: {
        percent: 1 - other,
      },
    });
  }

  return (
    <ul>
      {orderedPayload.map((entry: any, index: number) => {
        const percent = ((entry.payload.percent || 0) * 100).toFixed(1);
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
