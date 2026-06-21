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
              <p>
                El <strong>Dólar MEP</strong> (Mercado Electrónico de Pagos),
                también conocido como <strong>Dólar Bolsa</strong>, es una
                cotización del dólar que se obtiene de forma completamente legal
                a través del mercado de capitales argentino. No tiene nada de
                "paralelo" ni de informal: es una operación regulada por la CNV
                que cualquier persona puede hacer abriendo una cuenta en un
                broker o ALyC (Agente de Liquidación y Compensación).
              </p>
              <p>
                La gran ventaja del MEP es que su cotización está{" "}
                <strong>mucho más cerca del valor real del dólar</strong> que el
                dólar tarjeta. En mayo de 2026, mientras el dólar tarjeta sale
                aproximadamente <strong>$1.839</strong> (oficial $1.415 + 30%
                de percepciones), el MEP cotiza alrededor de{" "}
                <strong>$1.414</strong>. Esa diferencia de casi $425 por dólar
                es lo que te cuesta usar la tarjeta en lugar del MEP: en una
                suscripción de USD 15 por mes, eso se traduce en más de{" "}
                <strong>$6.000 ARS de más cada mes</strong>, solo por no usar
                la vía correcta.
              </p>
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
              <p>
                El <strong>AL30</strong> es el bono soberano argentino "Bonar
                2030". Cotiza en dos versiones: una en pesos (AL30) y otra en
                dólares (AL30D, donde la "D" indica liquidación en dólares).
                Como es el mismo bono, la relación entre ambos precios refleja
                directamente a cuántos pesos equivale un dólar en ese mercado.
                La operación concreta es:{" "}
                <strong>comprás AL30 con pesos, esperás el período de
                parqueo (actualmente 1 día hábil) y lo vendés como AL30D
                cobrando en dólares</strong>. El tipo de cambio implícito que
                obtenés es el Dólar MEP.
              </p>
              <p>
                <strong>Ejemplo práctico:</strong> Si el AL30 cotiza a $13.830
                ARS y el AL30D cotiza a $9,77 USD, el MEP sería $13.830 ÷ 9,77
                ≈ <strong>$1.415 por dólar</strong>. Ese cálculo lo hacen
                automáticamente los brokers: vos simplemente transferís pesos,
                operás el bono, y en 24–48 horas tenés los dólares acreditados
                en tu cuenta comitente. No hace falta saber de finanzas para
                hacerlo; la mayoría de las apps de inversión lo tienen como un
                flujo guiado.
              </p>
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
              <p>
                Los bonos AL30 y AL30D se negocian en tiempo real durante el
                horario bursátil (10:00 a 17:00 hs). Como cualquier activo
                financiero, sus precios fluctúan según la oferta y la demanda
                del momento. Eso significa que el MEP no es un valor fijo
                —puede cambiar varios pesos a lo largo del día dependiendo de
                cuánta gente esté comprando o vendiendo ese bono en particular.
                En la práctica, la variación intradía suele ser de{" "}
                <strong>$5 a $20</strong>, lo que es marginal frente al ahorro
                que generás versus el dólar tarjeta.
              </p>
              <p>
                Otros factores que mueven el MEP son el{" "}
                <strong>riesgo país</strong> (afecta el precio de todos los
                bonos soberanos), las <strong>expectativas de inflación</strong>{" "}
                y las <strong>regulaciones del BCRA</strong>. Por ejemplo, si el
                banco central interviene vendiendo bonos para contener la
                cotización, el MEP puede bajar transitoriamente. Por el
                contrario, en momentos de incertidumbre política o económica,
                la demanda de dólares empuja el MEP al alza. Para decisiones de
                consumo cotidiano —suscripciones, compras online, servicios del
                exterior— estas variaciones no son críticas: lo importante es
                que, en cualquier escenario razonable, el MEP <em>siempre</em>{" "}
                va a ser más barato que el dólar tarjeta mientras exista el 30%
                de percepciones sobre consumos en el exterior.
              </p>
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
