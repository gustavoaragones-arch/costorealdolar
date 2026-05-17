import { buildProductSchema } from "@/constants/schema";
import type { Product } from "@/constants/products";
import { calculateDollarCost } from "@/logic/calculateDollarCost";

interface ProductJsonLdProps {
  product: Product;
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
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

  const jsonLd = buildProductSchema(product, {
    tarjeta: tarjeta.totalCost,
    mep: mep.totalCost,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
