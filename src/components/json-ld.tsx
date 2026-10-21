import { buildJsonLd, type Lang } from "@/lib/seo";

export function JsonLd({ lang }: { lang: Lang }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildJsonLd(lang)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
