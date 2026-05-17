import { faqData } from "@/constants/faqData";
import { getTarjetaRate, taxRules } from "@/constants/taxRules";

function formatRate(rate: number): string {
  return rate.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function FaqSection() {
  const tarjetaRate = getTarjetaRate();
  const paisPercent = Math.round(taxRules.countryTax * 100);
  const perceptionsPercent = Math.round(taxRules.perceptions * 100);
  const usd100Tarjeta = Math.round(100 * tarjetaRate);
  const usd100Mep = Math.round(100 * taxRules.mepRate);

  return (
    <section
      aria-labelledby="aeo-content-heading"
      className="mt-16 space-y-10 border-t border-zinc-200 pt-12"
    >
      <h2 id="aeo-content-heading" className="sr-only">
        Guía y respuestas directas
      </h2>

      <article className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          Cómo se calcula el dólar tarjeta
        </h2>
        <p className="text-base leading-relaxed text-zinc-700">
          Desde enero 2026 el <strong>Impuesto PAIS es {paisPercent}%</strong>.
          El <strong>dólar tarjeta</strong> se arma sobre el oficial (
          <strong>${formatRate(taxRules.officialRate)} ARS</strong>) más la{" "}
          <strong>percepción del {perceptionsPercent}%</strong> (RG 5617) sobre
          consumos en el exterior con tarjeta. Fórmula actual:{" "}
          <em>
            Dólar tarjeta = oficial × (1 + percepciones) = $
            {formatRate(taxRules.officialRate)} × 1,{perceptionsPercent}
          </em>
          . La calculadora desglosa precio base, PAIS en cero y percepciones en
          el recibo.
        </p>
      </article>

      <article className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          Impuesto PAIS y Percepciones 2026
        </h2>
        <p className="text-base leading-relaxed text-zinc-700">
          En mayo 2026 el PAIS no aplica a estas operaciones (
          <strong>{paisPercent}%</strong>). Sigue la{" "}
          <strong>percepción del {perceptionsPercent}%</strong> en compras con
          tarjeta en el exterior. El dólar MEP (
          <strong>${taxRules.mepRate.toLocaleString("es-AR")} ARS</strong>) y el
          blue (
          <strong>${taxRules.blueRate.toLocaleString("es-AR")} ARS</strong>)
          quedan muy cerca del oficial; el tarjeta (
          <strong>${formatRate(tarjetaRate)} ARS</strong>) sigue siendo el modo
          más caro para Netflix, Steam o Amazon si no tenés alternativa MEP.
        </p>
        <h3 className="text-lg font-semibold text-zinc-800">
          ¿Cuánto cuesta el dólar tarjeta hoy con impuestos?
        </h3>
        <p className="text-base leading-relaxed text-zinc-700">
          El dólar tarjeta hoy cuesta{" "}
          <strong>${formatRate(tarjetaRate)}</strong> (Oficial $
          {formatRate(taxRules.officialRate)} + {perceptionsPercent}%
          Percepciones). USD 100 salen ~$
          {usd100Tarjeta.toLocaleString("es-AR")} ARS con tarjeta vs ~$
          {usd100Mep.toLocaleString("es-AR")} ARS con MEP — más de $
          {(usd100Tarjeta - usd100Mep).toLocaleString("es-AR")} ARS de
          diferencia.
        </p>
      </article>

      <article className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          Preguntas frecuentes — calculadora dólar Argentina
        </h2>
        <dl className="space-y-6">
          {faqData.map((item) => (
            <div key={item.question}>
              <dt className="text-lg font-semibold text-zinc-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-zinc-700">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </section>
  );
}
