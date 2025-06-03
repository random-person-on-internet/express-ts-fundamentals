export interface Transaction {
  id: string;
  amount: number;
  currency: "USD" | "EUR";
  type: "income" | "expense";
  date: Date;
}

export interface ConversionRates {
  USD: number;
  EUR: number;
}
