import type { MetadataRoute } from "next";
import { products } from "@/constants/products";
import { taxRules } from "@/constants/taxRules";
import { SITE_URL } from "@/constants/site";

/**
 * Priority guide:
 * 1.0 — Homepage (primary entry)
 * 0.8 — Product landing pages (programmatic SEO)
 * 0.7 — Metodología (E-E-A-T / AEO authority)
 * 0.3 — Legal & trust (Aviso legal, Privacidad)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(taxRules.updatedAt);

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/metodologia`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticPages, ...productEntries];
}
