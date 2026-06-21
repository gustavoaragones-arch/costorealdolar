import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DollarCalculator } from "@/components/DollarCalculator";
import { InfoBanner } from "@/components/InfoBanner";
import { buildPageMetadata } from "@/constants/metadata";
import { getCurrentYear } from "@/lib/freshness";
import { formatARS, formatUSD } from "@/lib/format";
import { calculateDollarCost } from "@/logic/calculateDollarCost";

// ---------------------------------------------------------------------------
// Netflix subscription tiers (USD/month, 2026 pricing)
// ---------------------------------------------------------------------------
const NETFLIX_TIERS = [
  {
    name: "Básico",
    note: "Con anuncios",
    usd: 7.0,
  },
  {
    name: "Estándar",
    note: "Full HD · 2 pantallas",
    usd: 15.49,
  },
  {
    name: "Premium",
    note: "4K Ultra HD · 4 pantallas",
    usd: 22.99,
  },
] as const;

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const year = getCurrentYear();

  return {
    ...buildPageMetadata({
      title: `Precio Dólar Netflix en Argentina (Actualizado) — ${year}`,
      description:
        "¿Cuánto cuesta Netflix hoy en Argentina? Calculá el precio final en pesos con impuestos incluidos. Cotización del dólar streaming actualizada.",
      canonicalPath: "/netflix",
    }),
    robots: { index: true, follow: true },
    keywords: [
      "netflix argentina precio pesos",
      "cuanto cuesta netflix argentina",
      "netflix dolar tarjeta 2026",
      "netflix percepciones impuestos",
      "precio netflix con impuestos argentina",
    ],
  };
}

// ---------------------------------------------------------------------------
// FAQ JSON-LD (injected inline — single question per spec)
// ---------------------------------------------------------------------------
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta Netflix con dólares en Argentina?",
      acceptedAnswer: {
        "@type": "Answer",
        // Placeholder — fill in with the current price when available.
        text: "El precio de Netflix en Argentina varía según el plan. Calculá el costo final en pesos usando nuestra calculadora de dólar tarjeta, que incluye el 30% de percepciones vigente en 2026.",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function NetflixPage() {
  // Compute tier conversions server-side — baked into static HTML for crawlers.
  const tiers = NETFLIX_TIERS.map((tier) => {
    const tarjeta = calculateDollarCost({
      usdAmount: tier.usd,
      purchaseType: "subscription",
      exchangeType: "tarjeta",
    });
    const mep = calculateDollarCost({
      usdAmount: tier.usd,
      purchaseType: "subscription",
      exchangeType: "mep",
    });

    return {
      ...tier,
      tarjetaTotal: tarjeta.totalCost,
      mepTotal: mep.totalCost,
      savings: tarjeta.totalCost - mep.totalCost,
    };
  });

  return (
    <>
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />

      <div className="min-h-full flex-1 bg-zinc-50 text-zinc-900">
        <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            ← Volver a la calculadora
          </Link>

          <header className="mb-8 mt-6 space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Calculadora de Dólar Netflix en Argentina
            </h1>
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base leading-relaxed text-amber-950">
              Netflix cobra en dólares aunque el resumen de tu tarjeta aparezca
              en pesos. El banco convierte al tipo de cambio tarjeta y aplica
              el 30% de percepciones. Usá MEP para pagar hasta un 23% menos.
            </p>
          </header>

          <InfoBanner />

          {/* Tier comparison table */}
          <section aria-labelledby="planes-heading" className="mt-8">
            <h2
              id="planes-heading"
              className="mb-4 text-xl font-semibold tracking-tight"
            >
              Precios Netflix en pesos (todos los planes)
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Comparación de precios Netflix en ARS usando dólar tarjeta y
                  dólar MEP, con impuestos incluidos
                </caption>
                <thead>
                  <tr className="border-b border-zinc-100 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    <th scope="col" className="px-5 py-3">
                      Plan
                    </th>
                    <th scope="col" className="px-5 py-3 text-right">
                      USD/mes
                    </th>
                    <th scope="col" className="px-5 py-3 text-right">
                      Tarjeta&nbsp;(+30%)
                    </th>
                    <th scope="col" className="px-5 py-3 text-right">
                      MEP
                      <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
                        ✓
                      </span>
                    </th>
                    <th scope="col" className="px-5 py-3 text-right">
                      Ahorro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {tiers.map((tier) => (
                    <tr
                      key={tier.name}
                      className="transition-colors hover:bg-zinc-50"
                    >
                      <td className="px-5 py-4">
                        <span className="font-semibold text-zinc-900">
                          {tier.name}
                        </span>
                        <span className="ml-2 text-xs text-zinc-400">
                          {tier.note}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums text-zinc-600">
                        {formatUSD(tier.usd)}
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums font-medium text-red-600">
                        {formatARS(tier.tarjetaTotal)}
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums font-semibold text-emerald-700">
                        {formatARS(tier.mepTotal)}
                      </td>
                      <td className="px-5 py-4 text-right tabular-nums text-zinc-500">
                        {formatARS(tier.savings)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-zinc-400">
              Precios calculados con dólar oficial{" "}
              + 30% percepciones (RG 5617). Impuesto PAIS 0% desde enero 2026.
            </p>
          </section>

          {/* Interactive calculator pre-filled with Standard plan */}
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              Calculá tu plan exacto
            </h2>
            <Suspense>
              <DollarCalculator
                initialAmount={NETFLIX_TIERS[1].usd}
                initialPurchaseType="subscription"
                initialExchangeType="tarjeta"
                documentTitleBase="Calculadora Netflix Argentina — Costo Real Dólar"
              />
            </Suspense>
          </div>

          {/* FAQ section (visible content mirrors the JSON-LD) */}
          <section
            aria-labelledby="faq-heading"
            className="mt-12 border-t border-zinc-100 pt-10"
          >
            <h2
              id="faq-heading"
              className="mb-6 text-xl font-semibold tracking-tight"
            >
              Preguntas frecuentes
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  ¿Cuánto cuesta Netflix con dólares en Argentina?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {/* Placeholder — fill in with current price when available. */}
                  El precio de Netflix en Argentina varía según el plan. Calculá
                  el costo final en pesos usando la calculadora de arriba, que
                  incluye el 30% de percepciones vigente en 2026.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-10 border-t border-zinc-100 pt-8">
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              ← Ver calculadora general
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
