"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import {
  Phone,
  MessageSquare,
  Globe,
  Menu,
  X,
  Ship,
  Plane,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const { content, lang, toggleLang, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: content.header.nav.home },
    { href: "#holidays", label: content.header.nav.holidays, badge: "2026" },
    { href: "#gateways", label: content.header.nav.gateways },
    { href: "#tracking", label: content.header.nav.tracking },
    { href: "#services", label: content.header.nav.services },
    { href: "#calculator", label: content.header.nav.calculator },
    { href: "#process", label: content.header.nav.process },
    { href: "#whyus", label: content.header.nav.whyUs },
    { href: "#faq", label: content.header.nav.faq },
    { href: "#contact", label: content.header.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Bar Notice Strip */}
      <div className="bg-[#0f2a4a] text-white text-xs py-2 px-4 border-b border-amber-500/30">
        <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>S.A. LOGISTICS | {content.footer.chinaTagline}</span>
          </div>

          <div className="flex items-center gap-5 text-slate-200">
            <a
              href={`tel:${content.header.contactPhone}`}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span dir="ltr">{content.header.contactPhone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/963966642574"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 font-bold hover:text-white transition-colors bg-emerald-950/70 px-3 py-0.5 rounded-full border border-emerald-500/40"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>{content.header.whatsappText}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3"
            : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4"
        }`}
      >
        <div className="layout-container flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0f2a4a] to-[#0a192f] p-2.5 flex items-center justify-center shadow-lg shadow-blue-950/20 group-hover:scale-105 transition-transform">
              <div className="relative flex items-center justify-center">
                <Ship className="w-6 h-6 text-amber-400" />
                <Plane className="w-3.5 h-3.5 text-sky-200 absolute -top-1 -right-1 transform rotate-45" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-[#0f2a4a] font-sans">
                  S.A.<span className="text-[#c5a059]">LOGISTICS</span>
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider">
                {content.header.brandSubtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-xs font-extrabold text-slate-700 hover:text-[#0f2a4a] transition-colors relative py-1 group whitespace-nowrap"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="mr-1.5 ml-1 inline-flex items-center px-1.5 py-0.2 text-[10px] font-black rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:border-slate-400 transition-all shadow-sm"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-4 h-4 text-[#0f2a4a]" />
              <span>{content.header.languageName}</span>
            </button>

            {/* Request Quote Button */}
            <button onClick={onOpenQuoteModal} className="gold-button px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap">
              <span>{content.header.quoteBtn}</span>
              {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="p-2 text-xs font-bold text-slate-700 rounded-lg border border-slate-200 bg-slate-50"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-5 space-y-3">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0f2a4a] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs font-extrabold rounded-full bg-amber-100 text-amber-900">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </a>
              ))}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full gold-button py-3 rounded-xl text-xs text-center font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <span>{content.header.quoteBtn}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
