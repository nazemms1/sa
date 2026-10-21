import type { Metadata } from "next";
import { siteContent } from "@/data/content";

export type Lang = "ar" | "en";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sa-logistics.net"
).replace(/\/$/, "");

export const SITE_NAME = "S.A. LOGISTICS";

/** Public URL path of each language version. Arabic is the default at `/`. */
export const LANG_PATH: Record<Lang, string> = { ar: "/", en: "/en" };

export const OG_LOCALE: Record<Lang, string> = { ar: "ar_AR", en: "en_US" };

export const PHONE = "+963966642574";
export const EMAIL = "info@sa-logistics.net";

const SEO: Record<
  Lang,
  { title: string; description: string; keywords: string[]; ogAlt: string }
> = {
  ar: {
    title: "S.A. LOGISTICS | شحن وتخليص جمركي من الصين إلى سوريا – جوي وبحري",
    description:
      "شركة شحن دولي وتخليص جمركي إلى سوريا: شحن جوي وبحري FCL وLCL من الصين وإيوا وغوانزو عبر مرفأ اللاذقية وبيروت والعقبة ومطار دمشق، مع نقل داخلي وتسليم حتى الباب. اطلب سعرك الآن.",
    keywords: [
      "شحن من الصين إلى سوريا",
      "شحن بحري إلى سوريا",
      "شحن جوي إلى دمشق",
      "تخليص جمركي سوريا",
      "تخليص جمركي اللاذقية",
      "شركة شحن دمشق",
      "شحن حاويات FCL LCL سوريا",
      "مستودعات إيوا وغوانزو",
      "استعلام جمركي سوريا",
      "التعرفة الجمركية السورية",
      "شحن عبر مرفأ بيروت إلى سوريا",
      "شحن عبر العقبة إلى سوريا",
      "S.A. LOGISTICS",
      "SA LOGISTICS",
    ],
    ogAlt: "S.A. LOGISTICS – الشحن الدولي والتخليص الجمركي إلى سوريا",
  },
  en: {
    title: "S.A. LOGISTICS | Freight Forwarding & Customs Clearance to Syria",
    description:
      "International air & sea freight (FCL/LCL) from China and worldwide to Syria via Latakia, Beirut and Aqaba ports and Damascus airport. Customs clearance, inland transport and door-to-door delivery. Get a quote today.",
    keywords: [
      "shipping from China to Syria",
      "freight forwarder Syria",
      "sea freight to Syria",
      "air freight to Damascus",
      "customs clearance Syria",
      "Latakia port clearance",
      "FCL LCL Syria",
      "Yiwu Guangzhou warehouse",
      "Syrian customs tariff lookup",
      "freight via Beirut port to Syria",
      "freight via Aqaba port to Syria",
      "S.A. LOGISTICS",
      "SA LOGISTICS",
    ],
    ogAlt: "S.A. LOGISTICS – International freight & customs clearance to Syria",
  },
};

export const ogImagePath = (lang: Lang) => `/og-${lang}.png`;

export function buildMetadata(lang: Lang): Metadata {
  const seo = SEO[lang];
  const url = LANG_PATH[lang];
  const other = lang === "ar" ? "en" : "ar";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.title, template: `%s | ${SITE_NAME}` },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "logistics",
    alternates: {
      canonical: url,
      languages: {
        ar: LANG_PATH.ar,
        en: LANG_PATH.en,
        "x-default": LANG_PATH.ar,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: seo.title,
      description: seo.description,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[other]],
      images: [
        {
          url: ogImagePath(lang),
          width: 1200,
          height: 630,
          alt: seo.ogAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImagePath(lang)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: true, email: true, address: true },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : undefined,
    },
  };
}

/** Structured data for one language version, linked through @id references. */
export function buildJsonLd(lang: Lang) {
  const c = siteContent[lang];
  const seo = SEO[lang];
  const pageUrl = `${SITE_URL}${LANG_PATH[lang] === "/" ? "/" : LANG_PATH[lang]}`;
  const orgId = `${SITE_URL}/#organization`;

  const organization = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: SITE_NAME,
    alternateName: ["SA LOGISTICS", "S.A. Logistics", "إس إيه لوجستيكس"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.svg`,
    },
    image: `${SITE_URL}${ogImagePath(lang)}`,
    description: seo.description,
    slogan: c.header.brandSubtitle,
    telephone: PHONE,
    email: EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: c.contact.damascusAddress,
      addressLocality: lang === "ar" ? "دمشق" : "Damascus",
      addressCountry: "SY",
    },
    areaServed: [
      { "@type": "Country", name: lang === "ar" ? "سوريا" : "Syria" },
      { "@type": "Country", name: lang === "ar" ? "الصين" : "China" },
      { "@type": "Country", name: lang === "ar" ? "لبنان" : "Lebanon" },
      { "@type": "Country", name: lang === "ar" ? "الأردن" : "Jordan" },
    ],
    knowsLanguage: ["ar", "en"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        email: EMAIL,
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
        areaServed: ["SY", "CN", "LB", "JO"],
      },
    ],
    location: [
      {
        "@type": "Place",
        name: c.contact.syriaTitle,
        address: { "@type": "PostalAddress", streetAddress: c.contact.damascusAddress, addressCountry: "SY" },
      },
      {
        "@type": "Place",
        name: lang === "ar" ? "مكتب اللاذقية" : "Latakia Office",
        address: { "@type": "PostalAddress", streetAddress: c.contact.lattakiaAddress, addressCountry: "SY" },
      },
      {
        "@type": "Place",
        name: "Guangzhou",
        address: { "@type": "PostalAddress", streetAddress: c.contact.guangzhouAddress, addressCountry: "CN" },
      },
      {
        "@type": "Place",
        name: "Yiwu",
        address: { "@type": "PostalAddress", streetAddress: c.contact.yiwuAddress, addressCountry: "CN" },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: c.services.title,
      itemListElement: c.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          provider: { "@id": orgId },
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: ["ar", "en"],
    publisher: { "@id": orgId },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: lang,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": orgId },
    primaryImageOfPage: `${SITE_URL}${ogImagePath(lang)}`,
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: lang,
    mainEntity: c.faq.items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [organization, website, webpage, faq] };
}
