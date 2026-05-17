import Link from "next/link";
import { products } from "@/constants/products";

interface ProductLinksProps {
  currentSlug?: string;
}

export function ProductLinks({ currentSlug }: ProductLinksProps) {
  return (
    <nav
      aria-label="Cálculos populares"
      className="mt-16 border-t border-zinc-200 pt-10"
    >
      <h2 className="text-lg font-bold text-zinc-900">Cálculos populares</h2>
      <p className="mt-1 text-sm text-zinc-600">
        Costo real por producto: dólar tarjeta vs MEP (mayo 2026).
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {products.map((product) => {
          const isCurrent = product.slug === currentSlug;
          return (
            <li key={product.slug}>
              <Link
                href={`/product/${product.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`block rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  isCurrent
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                {product.name}
                <span
                  className={`mt-0.5 block text-xs font-normal ${
                    isCurrent ? "text-zinc-300" : "text-zinc-500"
                  }`}
                >
                  USD {product.basePriceUSD.toLocaleString("es-AR")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
