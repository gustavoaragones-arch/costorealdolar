import { taxRules } from "@/constants/taxRules";
import { formatARS, formatUSD } from "@/lib/format";
import type { CalculationResult } from "@/types/calculator";

const paisPercent = Math.round(taxRules.countryTax * 100);
const perceptionsPercent = Math.round(taxRules.perceptions * 100);

interface ReceiptBreakdownProps {
  result: CalculationResult;
  usdAmount: number;
}

function ReceiptLine({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 text-sm ${
        muted ? "text-zinc-500" : "text-zinc-800"
      }`}
    >
      <span>{label}</span>
      <span className="font-mono tabular-nums">{value}</span>
    </div>
  );
}

export function ReceiptBreakdown({ result, usdAmount }: ReceiptBreakdownProps) {
  const { baseAmount, taxes, totalCost, exchangeRate } = result;
  const hasTaxes = taxes.countryTax > 0 || taxes.perceptions > 0;

  return (
    <article
      aria-labelledby="receipt-heading"
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-[#faf8f5] shadow-lg shadow-zinc-200/60"
    >
      <div className="border-b border-dashed border-zinc-300 px-6 py-4">
        <p
          id="receipt-heading"
          className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600"
        >
          Costo Real Dólar
        </p>
        <p className="mt-1 text-center text-xs text-zinc-400">
          {new Date().toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="space-y-3 px-6 py-5 font-mono">
        <ReceiptLine
          label="Monto USD"
          value={formatUSD(usdAmount)}
        />
        <ReceiptLine
          label="Cotización"
          value={`$${exchangeRate.toLocaleString("es-AR")}`}
          muted
        />

        <div className="my-2 border-t border-dashed border-zinc-300" />

        <ReceiptLine label="Precio base (ARS)" value={formatARS(baseAmount)} />

        <ReceiptLine
          label={`Impuesto PAIS (${paisPercent}%)`}
          value={formatARS(taxes.countryTax)}
          muted={taxes.countryTax === 0}
        />
        <ReceiptLine
          label={`Percepciones (${perceptionsPercent}%)`}
          value={formatARS(taxes.perceptions)}
          muted={taxes.perceptions === 0}
        />

        {result.fees > 0 && (
          <ReceiptLine label="Comisiones" value={formatARS(result.fees)} />
        )}

        <div className="my-3 border-t-2 border-double border-zinc-400" />

        <div className="flex items-end justify-between gap-4">
          <span
            className="text-base font-bold uppercase tracking-wide text-zinc-900"
            aria-live="polite"
          >
            Total
          </span>
          <span className="text-3xl font-bold tabular-nums text-zinc-900 sm:text-4xl">
            {formatARS(totalCost)}
          </span>
        </div>
      </div>

      <div className="h-3 bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,#e4e4e7_4px,#e4e4e7_8px)]" />
    </article>
  );
}
