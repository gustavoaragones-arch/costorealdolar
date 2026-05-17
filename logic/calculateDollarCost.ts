import {
  exchangeRates,
  getTarjetaRate,
  taxRules,
} from "@/constants/taxRules";
import { getTaxMultiplier } from "@/logic/taxEngine";
import type {
  CalculationResult,
  CalculatorInput,
  ExchangeType,
  PurchaseType,
  TaxBreakdown,
} from "@/types/calculator";

const EXCHANGE_LABELS: Record<ExchangeType, string> = {
  official: "Dólar oficial",
  blue: "Dólar blue",
  mep: "Dólar MEP",
  tarjeta: "Dólar tarjeta",
};

const OPTIMAL_CANDIDATES: Record<PurchaseType, ExchangeType[]> = {
  dollar: ["blue", "mep", "official"],
  subscription: ["mep", "blue", "tarjeta"],
  card: ["mep", "blue", "tarjeta"],
  import: ["mep", "blue", "tarjeta"],
};

function computeTarjetaResult(usdAmount: number): CalculationResult {
  const baseRate = taxRules.officialRate;
  const baseAmount = usdAmount * baseRate;
  const perceptionAmount = baseAmount * taxRules.perceptions;
  const exchangeRate = getTarjetaRate();

  const taxes: TaxBreakdown = {
    countryTax: 0,
    perceptions: perceptionAmount,
    fees: 0,
  };

  return {
    exchangeRate,
    baseAmount,
    taxes,
    fees: 0,
    totalCost: baseAmount + perceptionAmount,
  };
}

function computeCore(input: CalculatorInput): CalculationResult {
  const { usdAmount, purchaseType, exchangeType } = input;

  if (exchangeType === "tarjeta") {
    return computeTarjetaResult(usdAmount);
  }

  const exchangeRate = exchangeRates[exchangeType];
  const baseAmount = usdAmount * exchangeRate;
  const taxMultiplier = getTaxMultiplier(purchaseType, exchangeType);
  const extraTax = baseAmount * (taxMultiplier - 1);

  const taxes: TaxBreakdown = {
    countryTax: extraTax > 0 ? baseAmount * taxRules.countryTax : 0,
    perceptions: extraTax > 0 ? baseAmount * taxRules.perceptions : 0,
    fees: 0,
  };

  return {
    exchangeRate,
    baseAmount,
    taxes,
    fees: 0,
    totalCost: baseAmount * taxMultiplier,
  };
}

function getOptimalExchangeType(
  purchaseType: PurchaseType,
  usdAmount: number,
): ExchangeType {
  const candidates = OPTIMAL_CANDIDATES[purchaseType];
  let best = candidates[0];
  let lowestTotal = Infinity;

  for (const exchangeType of candidates) {
    const { totalCost } = computeCore({
      usdAmount,
      purchaseType,
      exchangeType,
    });
    if (totalCost < lowestTotal) {
      lowestTotal = totalCost;
      best = exchangeType;
    }
  }

  return best;
}

function buildSavingsComparison(
  input: CalculatorInput,
  current: CalculationResult,
): CalculationResult["savingsComparison"] {
  const optimal = getOptimalExchangeType(input.purchaseType, input.usdAmount);

  if (optimal === input.exchangeType || input.usdAmount <= 0) {
    return undefined;
  }

  const optimalResult = computeCore({
    ...input,
    exchangeType: optimal,
  });

  const savingsAmount = current.totalCost - optimalResult.totalCost;

  if (savingsAmount <= 0) {
    return undefined;
  }

  return {
    alternativeExchange: optimal,
    alternativeTotal: optimalResult.totalCost,
    savingsAmount,
    savingsPercent: (savingsAmount / current.totalCost) * 100,
  };
}

export function getExchangeLabel(exchangeType: ExchangeType): string {
  return EXCHANGE_LABELS[exchangeType];
}

export function calculateDollarCost(input: CalculatorInput): CalculationResult {
  const result = computeCore(input);
  const savingsComparison = buildSavingsComparison(input, result);

  return savingsComparison ? { ...result, savingsComparison } : result;
}
