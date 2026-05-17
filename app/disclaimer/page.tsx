import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/constants/metadata";

const title = "Disclaimer — Aviso legal";

export const metadata: Metadata = buildPageMetadata({
  title,
  description:
    "Costo Real Dólar es una herramienta informativa. No es asesoramiento financiero, cambiario ni impositivo.",
  canonicalPath: "/disclaimer",
});

export default function DisclaimerPage() {
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
          Disclaimer
        </h1>
        <p className="text-lg leading-relaxed text-zinc-700">
          Leé este aviso antes de usar la calculadora o las páginas de productos.
        </p>
      </header>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-zinc-700">
        <p>
          <strong>Costo Real Dólar</strong> (costorealdolar.com) es una
          herramienta educativa e informativa. Los resultados son estimaciones
          basadas en cotizaciones y reglas configuradas manualmente (ver{" "}
          <Link href="/metodologia" className="font-medium text-zinc-900 underline">
            Metodología
          </Link>
          ).
        </p>
        <p>
          <strong>No es asesoramiento financiero.</strong> No somos banco,
          casa de cambio, contador ni asesor impositivo. No recomendamos
          operaciones específicas ni garantizamos ahorros reales.
        </p>
        <p>
          Los tipos de cambio, impuestos y percepciones cambian con frecuencia
          en Argentina. Tu entidad financiera puede aplicar montos distintos.
        </p>
        <p>
          Al usar este sitio aceptás que cualquier decisión de compra o pago es
          bajo tu exclusiva responsabilidad.
        </p>
      </div>
    </article>
  );
}
