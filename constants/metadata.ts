import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_URL } from "@/constants/site";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Costo Real Dólar — Calculadora dólar tarjeta, MEP y blue en Argentina",
} as const;

export const SITE_ICONS: Metadata["icons"] = {
  icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
};

export const sharedOpenGraph = {
  siteName: "Costo Real Dólar",
  locale: "es_AR" as const,
  type: "website" as const,
  images: [OG_IMAGE],
};

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  canonicalPath,
}: {
  title: string;
  description?: string;
  canonicalPath: string;
}): Metadata {
  // For the homepage "/" we use SITE_URL directly (no trailing slash) so the
  // canonical tag and the sitemap entry are byte-for-byte identical.
  // For all other paths we append the path to SITE_URL.
  const canonicalUrl =
    canonicalPath === "/" ? SITE_URL : `${SITE_URL}${canonicalPath}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      ...sharedOpenGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
