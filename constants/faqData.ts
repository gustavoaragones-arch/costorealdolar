import { getTarjetaRate, taxRules } from "@/constants/taxRules";

export interface FaqItem {
  question: string;
  answer: string;
}

const tarjetaRate = getTarjetaRate();
const tarjetaFormatted = tarjetaRate.toLocaleString("es-AR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const mepFormatted = taxRules.mepRate.toLocaleString("es-AR");
const officialFormatted = taxRules.officialRate.toLocaleString("es-AR");
const perceptionsPercent = Math.round(taxRules.perceptions * 100);
const usd100Tarjeta = Math.round(100 * tarjetaRate).toLocaleString("es-AR");
const usd100Mep = Math.round(100 * taxRules.mepRate).toLocaleString("es-AR");

export const faqData: FaqItem[] = [
  {
    question: "¿Cuánto cuesta el dólar tarjeta hoy con impuestos?",
    answer: `En mayo 2026 el dólar tarjeta ronda $${tarjetaFormatted} ARS por USD (oficial $${officialFormatted} + ${perceptionsPercent}% percepciones). El Impuesto PAIS está en 0% desde enero 2026. USD 100 con tarjeta cuestan ~$${usd100Tarjeta} ARS; con MEP (~$${mepFormatted}) ~$${usd100Mep} ARS — una diferencia de más de $40.000 por cada USD 100.`,
  },
  {
    question: "¿Cómo se calcula el dólar tarjeta?",
    answer: `Desde 2026 el Impuesto PAIS es 0%. El dólar tarjeta se obtiene multiplicando el dólar oficial ($${officialFormatted}) por 1 + percepciones (${perceptionsPercent}%, RG 5617 sobre consumos en el exterior con tarjeta). Fórmula: USD × $${officialFormatted} × 1,${perceptionsPercent} = $${tarjetaFormatted} ARS por dólar.`,
  },
  {
    question: "¿Cuál es la diferencia entre dólar MEP y dólar tarjeta?",
    answer: `El MEP cotiza ~$${mepFormatted} ARS y el tarjeta ~$${tarjetaFormatted} ARS (mayo 2026). La brecha supera $${Math.round(tarjetaRate - taxRules.mepRate).toLocaleString("es-AR")} por dólar: en USD 100 pagás ~$${(100 * (tarjetaRate - taxRules.mepRate)).toLocaleString("es-AR")} ARS de más usando tarjeta en lugar de MEP cuando aplica.`,
  },
];
