"use client";

import React, { createContext, useContext } from "react";
import { siteContent, ContentTranslation } from "@/data/content";

type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  /** Real URL of the other language version, rendered as a crawlable link. */
  altHref: string;
  content: ContentTranslation;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * The language is fixed by the URL (`/` = Arabic, `/en` = English), so each
 * version is indexable on its own and server-rendered in the right language.
 */
export const LanguageProvider: React.FC<{
  initialLang: Language;
  children: React.ReactNode;
}> = ({ initialLang, children }) => {
  const value: LanguageContextType = {
    lang: initialLang,
    altHref: initialLang === "ar" ? "/en" : "/",
    content: siteContent[initialLang],
    isRtl: initialLang === "ar",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
