export type PurchaseType = "dollar" | "subscription" | "card" | "import";

export type ExchangeType = "official" | "blue" | "mep" | "tarjeta";

export interface TaxBreakdown {
  countryTax: number;
  perceptions: number;
  fees: number;
}

export interface SavingsComparison {
  alternativeExchange: ExchangeType;
  alternativeTotal: number;
  savingsAmount: number;
  savingsPercent: number;
}

export interface CalculationResult {
  exchangeRate: number;
  baseAmount: number;
  taxes: TaxBreakdown;
  fees: number;
  totalCost: number;
  savingsComparison?: SavingsComparison;
}

export interface CalculatorInput {
  usdAmount: number;
  purchaseType: PurchaseType;
  exchangeType: ExchangeType;
}
