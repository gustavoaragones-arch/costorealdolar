import type { Metadata } from "next";
import { Suspense } from "react";
import { DollarCalculator } from "@/components/DollarCalculator";
import { FaqSection } from "@/components/FaqSection";
import { InfoBanner } from "@/components/InfoBanner";
import { JsonLd } from "@/components/JsonLd";
import { ProductLinks } from "@/components/ProductLinks";
import { buildPageMetadata } from "@/constants/metadata";
import { getMonthYear } from "@/lib/freshness";

const META_DESCRIPTION =
  "Ingresá el monto de tu compra en dólares y calculá el costo real en pesos con nuestra calculadora de dólar tarjeta. Incluye todos los impuestos actualizados.";

// generateMetadata keeps SSG intact: new Date() is evaluated at build time,
// so the month/year is baked into the static HTML on every deploy.
export async function generateMetadata(): Promise<Metadata> {
  const monthYear = getMonthYear();

  return {
    ...buildPageMetadata({
      title: `Calculadora Dólar Tarjeta Hoy: Convertí a Pesos Argentinos — ${monthYear}`,
      description: META_DESCRIPTION,
      canonicalPath: "/",
    }),
    robots: { index: true, follow: true },
    keywords: [
      "calculadora dolar tarjeta",
      "dolar tarjeta hoy argentina",
      "cuanto cuesta dolar con impuestos",
      "dolar tarjeta en pesos",
      "dolar mep calculadora",
      "dolar blue calculadora",
      "percepciones dolar tarjeta",
    ],
  };
}

export default function Home() {
  const monthYear = getMonthYear();

  return (
    <>
      <JsonLd />
      <div className="min-h-full flex-1 bg-zinc-50 text-zinc-900">
        <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <header className="mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Calculadora Dólar Tarjeta
              </h1>
              <span
                className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800"
                aria-label={`Tasas actualizadas a ${monthYear}`}
              >
                Actualizado {monthYear}
              </span>
            </div>
            <p className="text-lg text-zinc-600">
              Sin Impuesto PAIS (0%, eliminado en 2026). Percepciones 30% en
              dólar tarjeta. Compará MEP, blue y tarjeta al instante.
            </p>
          </header>

          <InfoBanner />

          <div className="mt-8">
            <Suspense>
              <DollarCalculator />
            </Suspense>
          </div>

          <FaqSection />

          <ProductLinks />
        </main>
      </div>
    </>
  );
}
