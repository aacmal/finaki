// group by day using timestamp

export const groupByDay = (array: any[]): any[] => {
  const result = array.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString(
      Intl.DateTimeFormat().resolvedOptions().locale,
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  return Object.keys(result).map((date) => ({ date, data: result[date] }));
}