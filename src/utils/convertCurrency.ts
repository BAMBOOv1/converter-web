export interface CurrencyRate {
  [key: string]: number;
}

export const currencyUnits = [
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "KRW", name: "Korean Won", symbol: "₩" },
];

export async function fetchExchangeRates(
  baseCurrency: string = "USD"
): Promise<CurrencyRate | null> {
  try {
    const response = await fetch(
      `/api/rates?base=${encodeURIComponent(baseCurrency)}`
    );
    if (!response.ok) throw new Error(String(response.status));
    const data = (await response.json()) as { rates?: CurrencyRate };
    const rates = data?.rates;
    if (rates && typeof rates === "object") return rates;
    return null;
  } catch {
    return null;
  }
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates?: CurrencyRate
): number {
  if (!Number.isFinite(amount)) return 0;
  if (fromCurrency === toCurrency) return amount;

  const fromRate = rates?.[fromCurrency];
  const toRate = rates?.[toCurrency];

  if (fromRate && toRate) {
    const baseAmount = amount / fromRate;
    return baseAmount * toRate;
  }

  if (fromCurrency === "USD" && typeof toRate === "number")
    return amount * toRate;
  if (toCurrency === "USD" && typeof fromRate === "number")
    return amount / fromRate;

  return 0;
}
