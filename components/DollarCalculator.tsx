"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DollarSelector } from "@/components/DollarSelector";
import { ReceiptBreakdown } from "@/components/ReceiptBreakdown";
import { SavingsCard } from "@/components/SavingsCard";
import { ShareButton } from "@/components/ShareButton";
import {
  parseCalculatorSearchParams,
  syncCalculatorUrl,
} from "@/lib/calculatorUrl";
import { formatARS } from "@/lib/format";
import { calculateDollarCost } from "@/logic/calculateDollarCost";
import type { ExchangeType, PurchaseType } from "@/types/calculator";

const DEFAULT_BASE_TITLE =
  "Calculadora Dólar Tarjeta, MEP y Blue - Costo Real con Impuestos";

export interface DollarCalculatorProps {
  initialAmount?: number;
  initialPurchaseType?: PurchaseType;
  initialExchangeType?: ExchangeType;
  documentTitleBase?: string;
}

function CalculatorSkeleton() {
  return (
    <section
      aria-label="Cargando calculadora"
      className="animate-pulse space-y-8"
    >
      <div className="h-16 rounded-2xl bg-zinc-200" />
      <div className="h-24 rounded-xl bg-zinc-200" />
      <div className="h-48 rounded-2xl bg-zinc-200" />
    </section>
  );
}

function DollarCalculatorInner({
  initialAmount,
  initialPurchaseType = "card",
  initialExchangeType = "tarjeta",
  documentTitleBase = DEFAULT_BASE_TITLE,
}: DollarCalculatorProps) {
  const searchParams = useSearchParams();

  const defaultAmount =
    initialAmount != null && initialAmount > 0 ? String(initialAmount) : "";

  const parsed = parseCalculatorSearchParams(searchParams, {
    amount: defaultAmount,
    purchaseType: initialPurchaseType,
    exchangeType: initialExchangeType,
  });

  const [amountInput, setAmountInput] = useState(parsed.amount);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>(
    parsed.purchaseType,
  );
  const [exchangeType, setExchangeType] = useState<ExchangeType>(
    parsed.exchangeType,
  );

  const usdAmount = useMemo(() => {
    const parsedAmount = parseFloat(amountInput.replace(",", "."));
    return Number.isFinite(parsedAmount) && parsedAmount >= 0
      ? parsedAmount
      : 0;
  }, [amountInput]);

  const result = useMemo(
    () =>
      calculateDollarCost({
        usdAmount,
        purchaseType,
        exchangeType,
      }),
    [usdAmount, purchaseType, exchangeType],
  );

  useEffect(() => {
    syncCalculatorUrl(amountInput, purchaseType, exchangeType);
  }, [amountInput, purchaseType, exchangeType]);

  useEffect(() => {
    if (usdAmount > 0) {
      document.title = `${formatARS(result.totalCost)} — Total real | Costo Real Dólar`;
    } else {
      document.title = documentTitleBase;
    }

    return () => {
      document.title = documentTitleBase;
    };
  }, [usdAmount, result.totalCost, documentTitleBase]);

  return (
    <section aria-label="Calculadora de costo real del dólar" className="space-y-8">
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {usdAmount > 0
          ? `Total estimado: ${formatARS(result.totalCost)}`
          : "Ingresá un monto en dólares para ver el total"}
      </p>
      <div className="space-y-2">
        <label
          htmlFor="usd-amount"
          className="block text-sm font-medium text-zinc-700"
        >
          Monto en dólares (USD)
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-medium text-zinc-400">
            $
          </span>
          <input
            id="usd-amount"
            type="text"
            inputMode="decimal"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
            placeholder="0"
            className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-10 pr-4 text-3xl font-semibold tabular-nums text-zinc-900 shadow-sm outline-none transition-shadow focus:border-zinc-400 focus-visible:ring-4 focus-visible:ring-zinc-900/20"
            aria-label="Monto en dólares estadounidenses"
            aria-describedby="usd-amount-hint"
          />
        </div>
        <p id="usd-amount-hint" className="text-xs text-zinc-500">
          El total se actualiza al escribir. Sin botón de calcular.
        </p>
      </div>

      <DollarSelector
        purchaseType={purchaseType}
        exchangeType={exchangeType}
        onPurchaseTypeChange={setPurchaseType}
        onExchangeTypeChange={setExchangeType}
      />

      {result.savingsComparison && (
        <SavingsCard comparison={result.savingsComparison} />
      )}

      <ShareButton
        usdAmount={usdAmount}
        purchaseType={purchaseType}
        exchangeType={exchangeType}
        amountInput={amountInput}
        savingsComparison={result.savingsComparison}
      />

      <ReceiptBreakdown result={result} usdAmount={usdAmount} />
    </section>
  );
}

export function DollarCalculator(props: DollarCalculatorProps = {}) {
  return (
    <Suspense fallback={<CalculatorSkeleton />}>
      <DollarCalculatorInner {...props} />
    </Suspense>
  );
}
