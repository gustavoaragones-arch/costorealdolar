"use client";

import { useCallback, useState } from "react";
import { formatARS } from "@/lib/format";
import { buildCalculatorQueryString } from "@/lib/calculatorUrl";
import type { ExchangeType, PurchaseType, SavingsComparison } from "@/types/calculator";

interface ShareButtonProps {
  usdAmount: number;
  purchaseType: PurchaseType;
  exchangeType: ExchangeType;
  amountInput: string;
  savingsComparison?: SavingsComparison;
}

function buildShareMessage(
  usdAmount: number,
  shareUrl: string,
  savingsComparison?: SavingsComparison,
): string {
  const amountLabel = usdAmount.toLocaleString("es-AR", {
    maximumFractionDigits: 2,
  });

  if (savingsComparison && savingsComparison.savingsAmount > 0) {
    return `Mirá cuánto cuesta realmente ${amountLabel} USD en Argentina. Me ahorro ${formatARS(savingsComparison.savingsAmount)} usando Dólar MEP. Calculalo acá: ${shareUrl}`;
  }

  return `Mirá cuánto cuesta realmente ${amountLabel} USD en Argentina. Calculalo acá: ${shareUrl}`;
}

export function ShareButton({
  usdAmount,
  purchaseType,
  exchangeType,
  amountInput,
  savingsComparison,
}: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const getShareUrl = useCallback(() => {
    const query = buildCalculatorQueryString(
      amountInput,
      purchaseType,
      exchangeType,
    );
    return `${window.location.origin}${window.location.pathname}?${query}`;
  }, [amountInput, purchaseType, exchangeType]);

  const handleShare = useCallback(async () => {
    if (usdAmount <= 0) return;

    const shareUrl = getShareUrl();
    const text = buildShareMessage(usdAmount, shareUrl, savingsComparison);
    const title = "Costo Real Dólar — Calculadora Argentina";

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text, url: shareUrl });
        setStatus("idle");
        return;
      }

      await navigator.clipboard.writeText(text);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2500);
    }
  }, [usdAmount, getShareUrl, savingsComparison]);

  if (usdAmount <= 0) return null;

  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      >
        <ShareIcon />
        Compartir este cálculo
      </button>
      {status === "copied" && (
        <span className="text-sm text-emerald-700" role="status">
          Enlace copiado al portapapeles
        </span>
      )}
      {status === "error" && (
        <span className="text-sm text-red-700" role="status">
          No se pudo compartir. Intentá de nuevo.
        </span>
      )}
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM5 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm10 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 13a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      <path
        fillRule="evenodd"
        d="M8.39 5.11a1 1 0 0 1 1.22-.72l2.44.81a1 1 0 0 1-.63 1.9l-2.44-.81a1 1 0 0 1-.59-1.18Zm3.22 9.78a1 1 0 0 1-1.22.72l-2.44-.81a1 1 0 0 1 .63-1.9l2.44.81a1 1 0 0 1 .59 1.18ZM5.61 6.89a1 1 0 0 1 .59-1.18l2.44-.81a1 1 0 0 1 .63 1.9l-2.44.81a1 1 0 0 1-1.22-.72Zm8.78 3.22a1 1 0 0 1-1.22.72l-2.44.81a1 1 0 0 1-.63-1.9l2.44-.81a1 1 0 0 1 .59 1.18Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
