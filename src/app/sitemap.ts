import type { MetadataRoute } from "next";
import { SITE_URL, LANG_PATH } from "@/lib/seo";

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ar: url(LANG_PATH.ar),
    en: url(LANG_PATH.en),
    "x-default": url(LANG_PATH.ar),
  };
  return [
    {
      url: url(LANG_PATH.ar),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: url(LANG_PATH.en),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
