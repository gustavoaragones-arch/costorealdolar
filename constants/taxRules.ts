export const taxRules = {
  officialRate: 1415,
  blueRate: 1415,
  mepRate: 1414,
  countryTax: 0,
  perceptions: 0.3,
  updatedAt: "2026-05-16",
} as const;

export type TaxRules = typeof taxRules;

/** Dólar tarjeta = oficial + percepciones RG 5617 (PAIS eliminado ene 2026). */
export function getTarjetaRate(): number {
  return taxRules.officialRate * (1 + taxRules.perceptions);
}

export const exchangeRates: Record<
  "official" | "blue" | "mep" | "tarjeta",
  number
> = {
  official: taxRules.officialRate,
  blue: taxRules.blueRate,
  mep: taxRules.mepRate,
  tarjeta: getTarjetaRate(),
};
