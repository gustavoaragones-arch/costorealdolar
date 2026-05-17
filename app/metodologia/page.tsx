import type { Metadata } from "next";
import Link from "next/link";
import { getTarjetaRate, taxRules } from "@/constants/taxRules";
import { buildPageMetadata } from "@/constants/metadata";

const title = "Metodología — Cómo calculamos el costo real del dólar";

export const metadata: Metadata = buildPageMetadata({
  title,
  description:
    "Fuentes y fórmulas de Costo Real Dólar: Banco Nación, MEP, eliminación del Impuesto PAIS en 2026 y percepciones RG 5617 sobre consumos en el exterior.",
  canonicalPath: "/metodologia",
});

export default function MetodologiaPage() {
  const tarjetaRate = getTarjetaRate();
  const perceptionsPercent = Math.round(taxRules.perceptions * 100);

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        ← Volver al inicio
      </Link>

      <header className="mt-6 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Metodología de cálculo
        </h1>
        <p className="text-sm text-zinc-500">
          Última actualización: {taxRules.updatedAt}
        </p>
        <p className="text-lg leading-relaxed text-zinc-700">
          Esta página documenta cómo costorealdolar.com estima el costo en pesos
          de compras en dólares, suscripciones y consumos en el exterior. El
          objetivo es transparencia para usuarios y motores de respuesta (AEO).
        </p>
      </header>

      <div className="prose prose-zinc mt-10 max-w-none space-y-8 text-base leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            1. Cotizaciones de referencia (mayo 2026)
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Dólar oficial / Banco Nación:</strong> $
              {taxRules.officialRate.toLocaleString("es-AR")} ARS por USD
              (referencia publicada por entidades oficiales y mercado mayorista;
              actualizamos manualmente en{" "}
              <code className="rounded bg-zinc-100 px-1 text-sm">
                constants/taxRules.ts
              </code>
              ).
            </li>
            <li>
              <strong>Dólar blue:</strong> $
              {taxRules.blueRate.toLocaleString("es-AR")} ARS (mercado
              paralelo; en mayo 2026 converge con el oficial en nuestra
              referencia).
            </li>
            <li>
              <strong>Dólar MEP:</strong> $
              {taxRules.mepRate.toLocaleString("es-AR")} ARS (Mercado
              Electrónico de Pagos — bonos/activos locales liquidados en
              exterior).
            </li>
            <li>
              <strong>Dólar tarjeta:</strong> $
              {tarjetaRate.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ARS = oficial × (1 + percepciones). No es una cotización única del
              BCRA: es el costo efectivo para el consumidor.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            2. Impuesto PAIS — 0% desde enero 2026
          </h2>
          <p>
            El <strong>Impuesto PAIS</strong> (30% sobre compras en el exterior)
            fue <strong>eliminado</strong> para el escenario que modelamos a
            partir de enero 2026. Por eso{" "}
            <code className="rounded bg-zinc-100 px-1 text-sm">countryTax</code>{" "}
            en nuestra calculadora es <strong>0%</strong> y el recibo muestra
            “Impuesto PAIS (0%)”.
          </p>
          <p>
            Si la normativa cambia, actualizamos{" "}
            <code className="rounded bg-zinc-100 px-1 text-sm">taxRules.ts</code>{" "}
            y esta página en la misma fecha que las cotizaciones.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            3. Percepciones — {perceptionsPercent}% (RG 5617)
          </h2>
          <p>
            Para compras con <strong>tarjeta de crédito o débito</strong> en el
            exterior (suscripciones, e-commerce, servicios digitales), mantenemos
            una <strong>percepción del {perceptionsPercent}%</strong> sobre el
            monto convertido a pesos al tipo oficial, según el marco vigente
            (RG 5617 y actualizaciones relacionadas con Ganancias / Bienes
            Personales en consumos en el exterior).
          </p>
          <p>
            Fórmula dólar tarjeta:{" "}
            <em>
              USD × ${taxRules.officialRate} × (1 + {perceptionsPercent}%)
            </em>{" "}
            ≈ <strong>${tarjetaRate.toFixed(2)}</strong> por dólar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            4. Comparación MEP vs tarjeta
          </h2>
          <p>
            El MEP se modela sin el recargo del {perceptionsPercent}% de
            percepciones en los casos de suscripción/compra exterior de nuestra
            calculadora. La brecha tarjeta–MEP (~23% en mayo 2026) proviene
            casi por completo de ese recargo más la diferencia de cotización
            (oficial+percepciones vs MEP ~$
            {taxRules.mepRate.toLocaleString("es-AR")}).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            5. Limitaciones
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>No reemplaza el resumen de tu banco ni AFIP.</li>
            <li>
              Algunos comercios facturan en ARS; el banco puede igualmente
              aplicar dólar tarjeta.
            </li>
            <li>
              Comisiones de tarjeta, provincias y cupos no están modelados.
            </li>
            <li>
              Las cotizaciones son referenciales hasta integrar fuentes en
              tiempo real.
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
