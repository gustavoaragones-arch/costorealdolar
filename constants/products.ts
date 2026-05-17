import type { PurchaseType } from "@/types/calculator";

export interface Product {
  slug: string;
  name: string;
  basePriceUSD: number;
  anxietyNote: string;
  purchaseType: PurchaseType;
  metaDescription: string;
}

export const products: Product[] = [
  {
    slug: "netflix",
    name: "Netflix",
    basePriceUSD: 10,
    purchaseType: "subscription",
    anxietyNote:
      "Netflix cuenta como servicio del exterior aunque veas el cargo en pesos: el banco puede convertir a dólar tarjeta y aplicar percepciones.",
    metaDescription:
      "Calculá cuánto cuesta Netflix en Argentina con dólar tarjeta vs MEP. Precio USD 10/mes con impuestos 2026.",
  },
  {
    slug: "steam",
    name: "Steam",
    basePriceUSD: 60,
    purchaseType: "card",
    anxietyNote:
      "Las compras en Steam en USD disparan dólar tarjeta + 30% percepciones si pagás con tarjeta argentina.",
    metaDescription:
      "¿Cuánto sale comprar en Steam en Argentina? Compará dólar tarjeta y MEP con percepciones 2026.",
  },
  {
    slug: "iphone",
    name: "iPhone",
    basePriceUSD: 999,
    purchaseType: "import",
    anxietyNote:
      "Un iPhone importado o comprado en el exterior es compra internacional: la diferencia tarjeta vs MEP puede superar $400.000 ARS.",
    metaDescription:
      "¿Cuánto cuesta un iPhone en Argentina pagando en dólares? Costo real con tarjeta vs MEP (mayo 2026).",
  },
  {
    slug: "playstation",
    name: "PlayStation",
    basePriceUSD: 499,
    purchaseType: "import",
    anxietyNote:
      "Consolas y juegos en tiendas extranjeras se pagan en USD: el recargo del dólar tarjeta encarece cada compra grande.",
    metaDescription:
      "Calculá el costo real de PlayStation en Argentina. Dólar tarjeta vs MEP para compras en el exterior.",
  },
  {
    slug: "amazon_prime",
    name: "Amazon Prime",
    basePriceUSD: 15,
    purchaseType: "subscription",
    anxietyNote:
      "Amazon Prime Video factura como suscripción internacional: revisá si tu banco aplica dólar tarjeta aunque el resumen esté en ARS.",
    metaDescription:
      "¿Cuánto cuesta Amazon Prime en Argentina? Compará suscripción con dólar tarjeta y MEP al tipo de cambio real.",
  },
  {
    slug: "spotify",
    name: "Spotify",
    basePriceUSD: 6,
    purchaseType: "subscription",
    anxietyNote:
      "Spotify Premium se cobra en USD: con tarjeta argentina pagás dólar tarjeta + 30% percepciones aunque el plan parezca barato.",
    metaDescription:
      "¿Cuánto cuesta Spotify en Argentina? Costo real con dólar tarjeta vs MEP (USD 6/mes, mayo 2026).",
  },
  {
    slug: "disney_plus",
    name: "Disney+",
    basePriceUSD: 8,
    purchaseType: "subscription",
    anxietyNote:
      "Disney+ es suscripción del exterior: el cargo mensual en USD puede convertirse a dólar tarjeta con percepciones del 30%.",
    metaDescription:
      "Calculá cuánto cuesta Disney+ en Argentina. Compará dólar tarjeta y MEP para suscripciones internacionales.",
  },
  {
    slug: "macbook_air",
    name: "MacBook Air",
    basePriceUSD: 1099,
    purchaseType: "import",
    anxietyNote:
      "Un MacBook comprado afuera o en tienda internacional es importación de alto ticket: tarjeta vs MEP puede significar cientos de miles de pesos de diferencia.",
    metaDescription:
      "¿Cuánto cuesta un MacBook Air en Argentina en dólares? Costo real tarjeta vs MEP (USD 1099, mayo 2026).",
  },
  {
    slug: "airpods_pro",
    name: "AirPods Pro",
    basePriceUSD: 249,
    purchaseType: "import",
    anxietyNote:
      "AirPods en Apple Store US u otras tiendas extranjeras disparan el costo real si el banco aplica dólar tarjeta en lugar de MEP.",
    metaDescription:
      "¿Cuánto salen los AirPods Pro en Argentina pagando en USD? Compará dólar tarjeta y MEP con impuestos 2026.",
  },
  {
    slug: "youtube_premium",
    name: "YouTube Premium",
    basePriceUSD: 7,
    purchaseType: "subscription",
    anxietyNote:
      "YouTube Premium factura en dólares: es otra suscripción que puede sumar percepciones si no pagás con una vía tipo MEP.",
    metaDescription:
      "¿Cuánto cuesta YouTube Premium en Argentina? Dólar tarjeta vs MEP para suscripción mensual (USD 7).",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
