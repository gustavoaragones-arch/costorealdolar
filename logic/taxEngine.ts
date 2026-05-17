import { taxRules } from "@/constants/taxRules";
import type { ExchangeType, PurchaseType } from "@/types/calculator";

/**
 * Returns the tax coefficient on top of the official/base ARS amount.
 * 2026: PAIS = 0%; percepciones 30% on foreign card consumption (RG 5617).
 */
export function getTaxMultiplier(
  purchaseType: PurchaseType,
  exchangeType: ExchangeType,
): number {
  const { countryTax, perceptions } = taxRules;
  const foreignPurchase =
    purchaseType === "subscription" ||
    purchaseType === "card" ||
    purchaseType === "import";

  if (exchangeType === "blue") {
    return 1;
  }

  if (exchangeType === "mep") {
    return 1;
  }

  if (exchangeType === "tarjeta" || (exchangeType === "official" && foreignPurchase)) {
    return 1 + countryTax + perceptions;
  }

  if (purchaseType === "dollar" && exchangeType === "official") {
    return 1;
  }

  return 1;
}

export function getTaxAmount(baseAmount: number, multiplier: number): number {
  return baseAmount * (multiplier - 1);
}
