import Link from "next/link";

const POPULAR_PRODUCTS = [
  { href: "/product/netflix", label: "Netflix" },
  { href: "/product/iphone", label: "iPhone" },
  { href: "/product/steam", label: "Steam" },
] as const;

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Error 404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Esta página no existe
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          Puede que el enlace esté roto o la página se haya movido. Volvé a la
          calculadora o probá uno de estos cálculos populares.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Ir al inicio
          </Link>
        </div>

        <nav aria-label="Productos populares" className="mt-10">
          <h2 className="text-sm font-semibold text-zinc-700">
            Cálculos populares
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {POPULAR_PRODUCTS.map((product) => (
              <li key={product.href}>
                <Link
                  href={product.href}
                  className="inline-block rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {product.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
