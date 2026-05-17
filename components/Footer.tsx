import Link from "next/link";
import { CONTACT_EMAIL } from "@/constants/site";

const FOOTER_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/metodologia", label: "Metodología" },
  { href: "/disclaimer", label: "Aviso legal" },
  { href: "/privacidad", label: "Privacidad" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-zinc-700">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline-offset-4 hover:text-zinc-900 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500">
          Costo Real Dólar — herramienta informativa. No constituye asesoramiento
          financiero, cambiario ni impositivo. Consultá con tu banco o
          profesional antes de operar.
        </p>
        <p className="mt-2 text-xs text-zinc-400">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-zinc-500 hover:text-zinc-700 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          {" · "}© {new Date().getFullYear()} costorealdolar.com
        </p>
      </div>
    </footer>
  );
}
