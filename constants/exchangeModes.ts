import { exchangeRates } from "@/constants/taxRules";
import type { ExchangeType } from "@/types/calculator";

export interface ExchangeMode {
  id: ExchangeType;
  label: string;
  description: string;
  rate: number;
}

export const exchangeModes: ExchangeMode[] = [
  {
    id: "official",
    label: "Dólar oficial",
    description: "Tipo de cambio oficial del BCRA",
    rate: exchangeRates.official,
  },
  {
    id: "blue",
    label: "Dólar blue",
    description: "Mercado informal",
    rate: exchangeRates.blue,
  },
  {
    id: "mep",
    label: "Dólar MEP",
    description: "Mercado Electrónico de Pagos",
    rate: exchangeRates.mep,
  },
  {
    id: "tarjeta",
    label: "Dólar tarjeta",
    description: "Compras con tarjeta en el exterior",
    rate: exchangeRates.tarjeta,
  },
];
