import { buildJsonLdGraph } from "@/constants/schema";

export function JsonLd() {
  const jsonLd = buildJsonLdGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
