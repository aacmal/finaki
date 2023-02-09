export const currencyFormat = (value: number) => {
  const number = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return number.format(value);
};
