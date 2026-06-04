import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block crawlers from indexing infinite calculator state combinations.
        // Googlebot will index only the clean canonical product URL,
        // not parameterised variants like ?amt=100&pt=card&et=tarjeta.
        disallow: [
          "/*?*amt=",
          "/*?*pt=",
          "/*?*et=",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
