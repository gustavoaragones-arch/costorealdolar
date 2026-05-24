import { faqData } from "@/constants/faqData";
import { SITE_URL } from "@/constants/site";

type JsonLdNode = Record<string, unknown> & { "@context"?: string };

export function stripContext<T extends JsonLdNode>(node: T): Omit<T, "@context"> {
  const { "@context": _, ...rest } = node;
  return rest;
}

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Costo Real Dólar — Calculadora Dólar Tarjeta, MEP y Blue",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  description:
    "Calculadora gratuita del costo real en pesos de comprar dólares, suscripciones y compras en el exterior en Argentina. 0% Impuesto PAIS desde 2026; 30% Percepciones en dólar tarjeta; comparación MEP y blue.",
  url: SITE_URL,
  inLanguage: "es-AR",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ARS",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Calculadora dólar tarjeta con 0% Impuesto PAIS y 30% Percepciones",
    "Comparación dólar MEP vs tarjeta",
    "Desglose 0% Impuesto PAIS y 30% Percepciones en el recibo",
    "Cálculo en tiempo real sin registro",
  ],
} as const;

export function buildFaqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      stripContext(softwareApplicationSchema),
      stripContext(buildFaqPageSchema()),
    ],
  };
}

export function buildProductSchema(
  product: { name: string; slug: string; anxietyNote: string; basePriceUSD: number },
  costs: { tarjeta: number; mep: number },
) {
  const productUrl = `${SITE_URL}/product/${product.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.anxietyNote,
    url: productUrl,
    category: "Calculadora financiera",
    offers: [
      {
        "@type": "Offer",
        name: `${product.name} — Dólar tarjeta (costo real)`,
        price: costs.tarjeta.toFixed(2),
        priceCurrency: "ARS",
        priceValidUntil: "2026-12-31",
        url: productUrl,
        description: `Costo estimado en ARS con dólar tarjeta (0% Impuesto PAIS, 30% Percepciones). USD ${product.basePriceUSD}.`,
      },
      {
        "@type": "Offer",
        name: `${product.name} — Dólar MEP (costo real)`,
        price: costs.mep.toFixed(2),
        priceCurrency: "ARS",
        priceValidUntil: "2026-12-31",
        url: productUrl,
        description: `Costo estimado en ARS con dólar MEP (USD ${product.basePriceUSD}).`,
      },
    ],
  };
}
