"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteContent, ContentTranslation } from "@/data/content";

type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  content: ContentTranslation;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("ar");

  useEffect(() => {
    // Check saved language preference in localStorage
    const saved = localStorage.getItem("sa_logistics_lang") as Language;
    if (saved && (saved === "ar" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("sa_logistics_lang", newLang);
  };

  const toggleLang = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    toggleLang,
    content: siteContent[lang],
    isRtl: lang === "ar",
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
