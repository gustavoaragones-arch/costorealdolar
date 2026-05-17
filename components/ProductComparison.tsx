import { calculateDollarCost } from "@/logic/calculateDollarCost";
import { formatARS, formatUSD } from "@/lib/format";
import type { Product } from "@/constants/products";

interface ProductComparisonProps {
  product: Product;
}

export function ProductComparison({ product }: ProductComparisonProps) {
  const { basePriceUSD, purchaseType } = product;

  const tarjeta = calculateDollarCost({
    usdAmount: basePriceUSD,
    purchaseType,
    exchangeType: "tarjeta",
  });

  const mep = calculateDollarCost({
    usdAmount: basePriceUSD,
    purchaseType,
    exchangeType: "mep",
  });

  const savings = tarjeta.totalCost - mep.totalCost;
  const savingsPercent =
    tarjeta.totalCost > 0 ? (savings / tarjeta.totalCost) * 100 : 0;

  return (
    <section
      aria-label="Comparación dólar tarjeta vs MEP"
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
    >
      <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-3">
        <p className="text-sm font-medium text-zinc-700">
          Precio referencia: {formatUSD(basePriceUSD)} USD
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <caption className="sr-only">
            Comparación de costo en pesos: dólar tarjeta versus dólar MEP para{" "}
            {product.name}
          </caption>
          <thead>
            <tr className="border-b border-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-5 py-3 font-semibold">Modo</th>
              <th className="px-5 py-3 font-semibold text-right">Costo en ARS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-50 bg-red-50/50">
              <td className="px-5 py-4">
                <span className="font-semibold text-red-900">
                  Dólar tarjeta
                </span>
                <span className="mt-0.5 block text-xs font-medium text-red-800">
                  El error
                </span>
              </td>
              <td className="px-5 py-4 text-right font-mono text-lg font-bold tabular-nums text-red-900">
                {formatARS(tarjeta.totalCost)}
              </td>
            </tr>
            <tr className="border-b border-zinc-50 bg-emerald-50/50 ring-1 ring-inset ring-emerald-200/80">
              <td className="px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-emerald-900">
                    Dólar MEP
                  </span>
                  <span className="rounded-full bg-emerald-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Opción inteligente
                  </span>
                </div>
                <span className="mt-1 block text-xs font-medium text-emerald-900">
                  Recomendado — menor costo real
                </span>
              </td>
              <td className="px-5 py-4 text-right font-mono text-lg font-bold tabular-nums text-emerald-900">
                {formatARS(mep.totalCost)}
              </td>
            </tr>
            <tr className="bg-zinc-900 text-white">
              <td className="px-5 py-4 font-semibold">Ahorro total</td>
              <td className="px-5 py-4 text-right font-mono text-lg font-bold tabular-nums">
                {formatARS(savings)}
                <span className="mt-0.5 block text-xs font-normal text-zinc-300">
                  {savingsPercent.toFixed(0)}% menos con MEP
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
