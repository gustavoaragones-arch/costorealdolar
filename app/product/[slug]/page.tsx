import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DollarCalculator } from "@/components/DollarCalculator";
import { InfoBanner } from "@/components/InfoBanner";
import { ProductComparison } from "@/components/ProductComparison";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { ProductLinks } from "@/components/ProductLinks";
import { buildPageMetadata } from "@/constants/metadata";
import {
  getAllProductSlugs,
  getProductBySlug,
} from "@/constants/products";
import { buildProductComparison } from "@/lib/productComparison";
import type { CalculatorUrlParams } from "@/lib/calculatorUrl";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<CalculatorUrlParams>;
};

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const title = `¿Cuánto cuesta ${product.name} en Argentina? (Costo Real 2026)`;
  const canonicalPath = `/product/${product.slug}`;

  return {
    ...buildPageMetadata({
      title,
      description: product.metaDescription,
      canonicalPath,
    }),
    robots: { index: true, follow: true },
    keywords: [
      `cuanto cuesta ${product.name.toLowerCase()} argentina`,
      `${product.name.toLowerCase()} dolar tarjeta`,
      `${product.name.toLowerCase()} dolar mep`,
      "costo real dolares argentina",
    ],
  };
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const urlParams = await searchParams;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const pageTitle = `¿Cuánto cuesta ${product.name} en Argentina? (Costo Real 2026)`;
  const comparison = buildProductComparison(product);

  return (
    <>
      <ProductJsonLd product={product} />
      <div className="min-h-full flex-1 bg-zinc-50 text-zinc-900">
        <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            ← Volver a la calculadora
          </Link>

          <header className="mb-8 mt-6 space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {pageTitle}
            </h1>
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base leading-relaxed text-amber-950">
              {product.anxietyNote}
            </p>
          </header>

          <InfoBanner />

          <div className="mt-8 space-y-8">
            <ProductComparison product={product} comparison={comparison} />

            <DollarCalculator
              initialAmount={product.basePriceUSD}
              initialPurchaseType={product.purchaseType}
              initialExchangeType="tarjeta"
              documentTitleBase={pageTitle}
              initialAmountFromUrl={urlParams.amt}
              initialPurchaseTypeFromUrl={urlParams.pt}
              initialExchangeTypeFromUrl={urlParams.et}
            />
          </div>

          <ProductLinks currentSlug={product.slug} />
        </main>
      </div>
    </>
  );
}
