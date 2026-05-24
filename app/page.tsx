import type { Metadata } from "next";
import { DollarCalculator } from "@/components/DollarCalculator";
import { FaqSection } from "@/components/FaqSection";
import { InfoBanner } from "@/components/InfoBanner";
import { JsonLd } from "@/components/JsonLd";
import { ProductLinks } from "@/components/ProductLinks";
import { buildPageMetadata } from "@/constants/metadata";
import type { CalculatorUrlParams } from "@/lib/calculatorUrl";

const PAGE_TITLE =
  "Calculadora Dólar Tarjeta, MEP y Blue - Costo Real con Impuestos";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: PAGE_TITLE,
    canonicalPath: "/",
  }),
  robots: { index: true, follow: true },
  keywords: [
    "dolar argentina calculadora",
    "cuanto cuesta dolar con impuestos",
    "dolar tarjeta argentina",
    "dolar mep calculadora",
    "dolar blue calculadora",
    "sin impuesto pais 2026",
    "percepciones dolar tarjeta",
  ],
};

type HomeProps = {
  searchParams: Promise<CalculatorUrlParams>;
};

export default async function Home({ searchParams }: HomeProps) {
  const urlParams = await searchParams;

  return (
    <>
      <JsonLd />
      <div className="min-h-full flex-1 bg-zinc-50 text-zinc-900">
        <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <header className="mb-10 space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Cuánto te termina costando de verdad?
            </h1>
            <p className="text-lg text-zinc-600">
              Sin Impuesto PAIS (0%, eliminado en 2026). Percepciones 30% en
              dólar tarjeta. Compará MEP, blue y tarjeta al instante.
            </p>
          </header>

          <InfoBanner />

          <div className="mt-8">
            <DollarCalculator
              initialAmountFromUrl={urlParams.amt}
              initialPurchaseTypeFromUrl={urlParams.pt}
              initialExchangeTypeFromUrl={urlParams.et}
            />
          </div>

          <FaqSection />

          <ProductLinks />
        </main>
      </div>
    </>
  );
}
