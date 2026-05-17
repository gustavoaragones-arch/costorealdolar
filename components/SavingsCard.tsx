import { getExchangeLabel } from "@/logic/calculateDollarCost";
import { formatARS } from "@/lib/format";
import type { SavingsComparison } from "@/types/calculator";

interface SavingsCardProps {
  comparison: SavingsComparison;
}

export function SavingsCard({ comparison }: SavingsCardProps) {
  const alternativeLabel = getExchangeLabel(comparison.alternativeExchange);

  return (
    <aside
      role="alert"
      aria-live="polite"
      aria-label="Alerta de costo extra"
      className="rounded-2xl border-2 border-red-900 bg-red-800 px-5 py-4 text-white shadow-lg"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-red-100">
        Estás pagando de más
      </p>
      <p className="mt-2 text-lg font-semibold leading-snug text-white sm:text-xl">
        Estás pagando{" "}
        <span className="font-mono tabular-nums">
          {formatARS(comparison.savingsAmount)}
        </span>{" "}
        de más.
      </p>
      <p className="mt-2 text-sm text-red-50">
        Usando{" "}
        <strong className="font-semibold text-white">{alternativeLabel}</strong>{" "}
        ahorrarías{" "}
        <strong className="font-mono tabular-nums text-white">
          {formatARS(comparison.savingsAmount)}
        </strong>{" "}
        ({comparison.savingsPercent.toFixed(0)}% menos).
      </p>
    </aside>
  );
}
