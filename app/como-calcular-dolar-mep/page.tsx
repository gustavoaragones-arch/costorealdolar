import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/constants/metadata";
import { SITE_URL } from "@/constants/site";
import { taxRules } from "@/constants/taxRules";

const TITLE = "Cómo calcular la cotización del Dólar MEP paso a paso";
const DESCRIPTION =
  "Aprendé la fórmula exacta para calcular el Dólar MEP hoy usando los bonos AL30 y AL30D. Guía práctica y fácil de entender.";
const CANONICAL_PATH = "/como-calcular-dolar-mep";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    canonicalPath: CANONICAL_PATH,
  }),
  robots: { index: true, follow: true },
  keywords: [
    "como calcular dolar mep",
    "formula dolar mep argentina",
    "AL30 AL30D calculo",
    "dolar mep paso a paso",
    "cotizacion dolar mep hoy",
  ],
};

// Article JSON-LD — helps Google categorise this as a how-to guide and
// attribute authorship/freshness for E-E-A-T purposes.
const ARTICLE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  dateModified: taxRules.updatedAt,
  publisher: {
    "@type": "Organization",
    name: "Costo Real Dólar",
    url: SITE_URL,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}${CANONICAL_PATH}`,
  },
};

// ---------------------------------------------------------------------------
// Placeholder helper — makes scaffolded copy easy to spot and replace
// ---------------------------------------------------------------------------
function Placeholder({ id }: { id: string }) {
  return (
    <p
      data-placeholder={id}
      className="italic text-zinc-400"
      aria-label="Contenido pendiente"
    >
      {/* TODO: reemplazar con el contenido final */}
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ComoCaclularDolarMepPage() {
  return (
    <>
      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSONLD) }}
      />

      <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        {/* Back navigation */}
        <Link
          href="/"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          ← Volver a la Calculadora Dólar Tarjeta
        </Link>

        <header className="mt-6 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Cómo calculo la cotización de dólar MEP
          </h1>
          <p className="text-sm text-zinc-500">
            Última actualización: {taxRules.updatedAt}
          </p>
          <p className="text-lg leading-relaxed text-zinc-600">
            El Dólar MEP (también llamado Dólar Bolsa) es una cotización legal
            que podés obtener comprando y vendiendo bonos en pesos y en dólares
            dentro del mercado bursátil argentino. Entender su fórmula te ayuda
            a evaluar cuándo conviene usarlo frente al{" "}
            <Link
              href="/"
              className="font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-600"
            >
              dólar tarjeta
            </Link>
            .
          </p>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Article body                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-10 space-y-12 text-base leading-relaxed text-zinc-700">

          {/* Section 1 */}
          <section aria-labelledby="que-es-mep">
            <h2
              id="que-es-mep"
              className="text-xl font-bold text-zinc-900"
            >
              ¿Qué es el Dólar MEP?
            </h2>
            <div className="mt-4 space-y-4">
              <Placeholder id="que-es-mep-p1" />
              <Placeholder id="que-es-mep-p2" />
            </div>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="formula-al30">
            <h2
              id="formula-al30"
              className="text-xl font-bold text-zinc-900"
            >
              La fórmula: AL30 dividido AL30D
            </h2>
            <div className="mt-4 space-y-4">
              {/* Formula callout — visually distinct, not placeholder */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4">
                <p className="font-mono text-sm text-zinc-500">Fórmula</p>
                <p className="mt-1 text-lg font-semibold text-zinc-900">
                  Dólar MEP = Precio AL30 (ARS) ÷ Precio AL30D (USD)
                </p>
              </div>
              <Placeholder id="formula-al30-p1" />
              <Placeholder id="formula-al30-p2" />
            </div>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="por-que-varian">
            <h2
              id="por-que-varian"
              className="text-xl font-bold text-zinc-900"
            >
              ¿Por qué varían los precios?
            </h2>
            <div className="mt-4 space-y-4">
              <Placeholder id="varian-p1" />
              <Placeholder id="varian-p2" />
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* Internal CTA — links back to main calculator                     */}
          {/* ---------------------------------------------------------------- */}
          <section
            aria-labelledby="cta-heading"
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-6"
          >
            <h2
              id="cta-heading"
              className="text-lg font-semibold text-emerald-900"
            >
              Calculá cuánto te ahorrás usando MEP
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-emerald-800">
              Nuestra{" "}
              <Link
                href="/"
                className="font-semibold underline underline-offset-2 hover:text-emerald-600"
              >
                Calculadora Dólar Tarjeta
              </Link>{" "}
              compara el costo real de tus compras en dólares usando tarjeta,
              MEP y blue, con todos los impuestos incluidos.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Ir a la calculadora →
            </Link>
          </section>
        </div>

        {/* Footer navigation */}
        <footer className="mt-12 flex flex-wrap gap-4 border-t border-zinc-100 pt-8 text-sm font-medium text-zinc-600">
          <Link href="/" className="hover:text-zinc-900">
            Calculadora Dólar Tarjeta
          </Link>
          <Link href="/metodologia" className="hover:text-zinc-900">
            Metodología
          </Link>
          <Link href="/netflix" className="hover:text-zinc-900">
            Precio Netflix en Argentina
          </Link>
        </footer>
      </article>
    </>
  );
}
