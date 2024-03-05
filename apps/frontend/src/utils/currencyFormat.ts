type CurrencyFormatOptions = {
  style?: "currency";
  currency?: string;
  minimumFractionDigits?: number;
  currencyDisplay?: "symbol" | "code" | "name";
};

const initalOptions: CurrencyFormatOptions = {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
};

/**
 * Format number to currency format (1000 -> Rp 1.000)
 * @param value
 * @param options
 * @returns
 * @example
 * currencyFormat(1000) // Rp 1.000
 * currencyFormat(1000, { currency: "USD" }) // $1,000.00
 */
export const currencyFormat = (
  value: number,
  options?: CurrencyFormatOptions,
) => {
  const number = new Intl.NumberFormat("id-ID", options || initalOptions);

  return number.format(value);
};

/**
 * Remove currency from string value ("Rp 1.000" -> 1000)
 *
 * @param value
 * @returns
 * @example
 * removeCurrencyFormat("Rp 1.000") // 1000
 */
export const removeCurrencyFormat = (value: string) => {
  return Number(value.replace(/[^0-9]/g, ""));
};
