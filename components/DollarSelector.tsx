"use client";

import { useId } from "react";
import type { ExchangeType, PurchaseType } from "@/types/calculator";

const PURCHASE_OPTIONS: { value: PurchaseType; label: string }[] = [
  { value: "dollar", label: "Compra USD" },
  { value: "subscription", label: "Suscripción" },
  { value: "card", label: "Compra Exterior" },
];

const EXCHANGE_OPTIONS: { value: ExchangeType; label: string }[] = [
  { value: "tarjeta", label: "Dólar tarjeta" },
  { value: "mep", label: "Dólar MEP" },
  { value: "blue", label: "Dólar blue" },
];

interface DollarSelectorProps {
  purchaseType: PurchaseType;
  exchangeType: ExchangeType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onExchangeTypeChange: (type: ExchangeType) => void;
}

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  const groupId = useId();
  const legendId = `${groupId}-legend`;

  return (
    <fieldset className="space-y-2">
      <legend id={legendId} className="text-sm font-medium text-zinc-700">
        {label}
      </legend>
      <div
        id={groupId}
        role="radiogroup"
        aria-labelledby={legendId}
        className="flex rounded-xl bg-zinc-100 p-1"
      >
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                selected
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-700 hover:text-zinc-900"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function DollarSelector({
  purchaseType,
  exchangeType,
  onPurchaseTypeChange,
  onExchangeTypeChange,
}: DollarSelectorProps) {
  return (
    <div className="space-y-6" aria-label="Opciones de compra y tipo de cambio">
      <SegmentedControl
        label="Tipo de compra"
        options={PURCHASE_OPTIONS}
        value={purchaseType}
        onChange={onPurchaseTypeChange}
      />
      <SegmentedControl
        label="Modo de cambio"
        options={EXCHANGE_OPTIONS}
        value={exchangeType}
        onChange={onExchangeTypeChange}
      />
    </div>
  );
}
