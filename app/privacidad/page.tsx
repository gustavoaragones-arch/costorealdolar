import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/constants/metadata";
import { CONTACT_EMAIL } from "@/constants/site";
import { taxRules } from "@/constants/taxRules";

const title = "Política de privacidad";

export const metadata: Metadata = buildPageMetadata({
  title,
  description:
    "Cómo Costo Real Dólar trata la información cuando usás la calculadora y navegás costorealdolar.com.",
  canonicalPath: "/privacidad",
});

export default function PrivacidadPage() {
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
          Política de privacidad
        </h1>
        <p className="text-sm text-zinc-500">
          Última actualización: {taxRules.updatedAt}
        </p>
        <p className="text-lg leading-relaxed text-zinc-700">
          En <strong>costorealdolar.com</strong> respetamos tu privacidad. Esta
          política explica qué datos podemos tratar cuando usás nuestra
          calculadora y páginas relacionadas.
        </p>
      </header>

      <div className="mt-8 space-y-8 text-base leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            1. Quién opera el sitio
          </h2>
          <p className="mt-3">
            El sitio <strong>Costo Real Dólar</strong> (costorealdolar.com) ofrece
            herramientas informativas para estimar el costo en pesos de compras en
            dólares, suscripciones y consumos en el exterior en Argentina.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            2. Datos que no solicitamos
          </h2>
          <p className="mt-3">
            La calculadora funciona en tu navegador.{" "}
            <strong>No pedimos registro</strong>, correo electrónico, nombre ni
            datos bancarios para usar las funciones principales. Los montos en USD
            que ingresás se procesan localmente en tu dispositivo para mostrar
            resultados; no los almacenamos en una base de datos propia asociada a
            tu identidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            3. Datos técnicos automáticos
          </h2>
          <p className="mt-3">
            Como la mayoría de los sitios web, nuestro proveedor de hosting puede
            registrar información técnica cuando visitás el sitio, por ejemplo:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Dirección IP aproximada</li>
            <li>Tipo de navegador y dispositivo</li>
            <li>Páginas visitadas y fecha/hora de acceso</li>
            <li>Referrer (sitio desde el que llegaste)</li>
          </ul>
          <p className="mt-3">
            Usamos estos datos de forma agregada para mantener el servicio,
            diagnosticar errores y entender el uso general del sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            4. Cookies y almacenamiento local
          </h2>
          <p className="mt-3">
            Hoy el sitio no requiere cookies propias para el funcionamiento de la
            calculadora. Si en el futuro incorporamos cookies (por ejemplo, para
            recordar preferencias o medición de audiencia), actualizaremos esta
            política y, cuando corresponda, solicitaremos tu consentimiento según
            la normativa aplicable en Argentina.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            5. Servicios de terceros
          </h2>
          <p className="mt-3">
            El sitio puede alojarse en infraestructura de terceros (por ejemplo,
            proveedores de hosting o CDN) que procesan datos técnicos necesarios
            para entregar las páginas. En el futuro podríamos integrar servicios
            de analítica o publicidad; en ese caso indicaremos qué datos comparten
            esos proveedores y cómo podés gestionarlos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            6. Enlaces externos
          </h2>
          <p className="mt-3">
            Podemos enlazar a sitios de terceros (bancos, medios, referencias
            oficiales). No controlamos sus prácticas de privacidad; te recomendamos
            leer las políticas de cada sitio que visites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            7. Seguridad y conservación
          </h2>
          <p className="mt-3">
            Aplicamos medidas razonables para proteger la infraestructura del
            sitio. Los registros técnicos del hosting se conservan por el tiempo
            que exija el proveedor o la ley, y luego se eliminan o anonimizan
            cuando ya no son necesarios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">8. Tus derechos</h2>
          <p className="mt-3">
            Según la legislación argentina de protección de datos personales,
            podés solicitar acceso, actualización o supresión de datos personales
            que te conciernan si los hubiéramos tratado de forma identificable.
            Para consultas sobre privacidad, escribinos a{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-zinc-900 underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">
            9. Cambios a esta política
          </h2>
          <p className="mt-3">
            Podemos actualizar esta política para reflejar cambios en el sitio o
            en la normativa. La fecha de “última actualización” al inicio de la
            página indicará la versión vigente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900">10. Más información</h2>
          <p className="mt-3">
            Para el alcance informativo de la calculadora, consultá nuestro{" "}
            <Link
              href="/disclaimer"
              className="font-medium text-zinc-900 underline"
            >
              Aviso legal
            </Link>{" "}
            y la{" "}
            <Link
              href="/metodologia"
              className="font-medium text-zinc-900 underline"
            >
              Metodología
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
