import type { Product } from "@/constants/products";
import { calculateDollarCost } from "@/logic/calculateDollarCost";

export interface ProductComparisonData {
  tarjetaTotal: number;
  mepTotal: number;
  savings: number;
  savingsPercent: number;
}

export function buildProductComparison(product: Product): ProductComparisonData {
  const tarjeta = calculateDollarCost({
    usdAmount: product.basePriceUSD,
    purchaseType: product.purchaseType,
    exchangeType: "tarjeta",
  });

  const mep = calculateDollarCost({
    usdAmount: product.basePriceUSD,
    purchaseType: product.purchaseType,
    exchangeType: "mep",
  });

  const savings = tarjeta.totalCost - mep.totalCost;
  const savingsPercent =
    tarjeta.totalCost > 0 ? (savings / tarjeta.totalCost) * 100 : 0;

  return {
    tarjetaTotal: tarjeta.totalCost,
    mepTotal: mep.totalCost,
    savings,
    savingsPercent,
  };
}
