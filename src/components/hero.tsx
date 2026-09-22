"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";
import {
  Ship,
  Plane,
  Search,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Container,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onSearchTracking?: (code: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onSearchTracking }) => {
  const { content, isRtl } = useLanguage();
  const [quickCode, setQuickCode] = useState("");

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCode.trim() && onSearchTracking) {
      onSearchTracking(quickCode.trim());
      const trackingEl = document.getElementById("tracking");
      if (trackingEl) {
        trackingEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="home" className="relative pt-8 pb-20 lg:pt-14 lg:pb-24 overflow-hidden bg-slate-50/90">
      {/* Background Subtle Gradient Spheres & Grid Pattern */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-35 -z-10" />

      <div className="layout-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-300/90 shadow-md text-amber-950 text-xs font-black cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "7s" }} />
              <span>{content.hero.badge}</span>
            </motion.div>

            {/* H1 Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f2a4a] leading-[1.2] tracking-tight">
              {content.hero.titleStart}{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0f2a4a] via-[#1e40af] to-[#c5a059]">
                {content.hero.titleHighlight}
              </span>{" "}
              {content.hero.titleEnd}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl font-normal">
              {content.hero.subtitle}
            </p>

            {/* Company Statement Box */}
            <div className="p-4 rounded-2xl bg-white border-l-4 border-[#c5a059] shadow-md border-y border-r border-slate-200 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              {content.hero.companyStatement}
            </div>

            {/* Hero Quick Action Input Bar */}
            <div className="pt-2">
              <form
                onSubmit={handleQuickSearch}
                className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-2xl transition-all hover:border-amber-400"
              >
                <div className="relative w-full flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute right-4 left-auto rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto pointer-events-none" />
                  <input
                    type="text"
                    value={quickCode}
                    onChange={(e) => setQuickCode(e.target.value)}
                    placeholder={content.hero.quickTrackPlaceholder}
                    className="w-full py-3.5 px-12 text-sm bg-slate-50/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2a4a] focus:bg-white text-slate-800 placeholder-slate-400 font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto navy-button px-8 py-3.5 text-xs font-extrabold rounded-xl whitespace-nowrap flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>{content.hero.quickTrackBtn}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4 text-amber-400" /> : <ArrowRight className="w-4 h-4 text-amber-400" />}
                </button>
              </form>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#calculator"
                className="gold-button px-8 py-4 rounded-xl text-sm font-extrabold flex items-center gap-2 shadow-xl shadow-amber-500/20"
              >
                <span>{content.hero.primaryCta}</span>
                <TrendingUp className="w-4.5 h-4.5 text-slate-950" />
              </a>

              <a
                href="#holidays"
                className="px-7 py-4 rounded-xl text-sm font-extrabold text-[#0f2a4a] bg-white border border-slate-300 hover:border-[#0f2a4a] hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <Calendar className="w-4.5 h-4.5 text-amber-600" />
                <span>{content.hero.secondaryCta}</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/90">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{content.hero.highlights.airSeaFclLcl}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{content.hero.highlights.regionalExpertise}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{content.hero.highlights.finalDelivery}</span>
              </div>
            </div>

          </motion.div>

          {/* Interactive Route & Container Card Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-2xl shadow-slate-300/60 overflow-hidden animate-float">
              
              {/* Header Badge inside card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-extrabold text-[#0f2a4a] uppercase tracking-wider">
                    {content.hero.routeCard.statusBadge}
                  </span>
                </div>
                <span className="px-3.5 py-1 text-[11px] font-black rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                  GLOBAL 🌍 ➡ SYRIA 🇸🇾
                </span>
              </div>

              {/* Transport Modes Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-1 text-sky-700">
                    <Plane className="w-4.5 h-4.5" />
                    <span className="text-xs font-extrabold">{content.hero.routeCard.airOption}</span>
                  </div>
                  <div className="text-xl font-black text-slate-800">
                    {content.hero.routeCard.airDays}
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">{content.hero.routeCard.airportDest}</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-4.5 rounded-2xl bg-amber-50/80 border border-amber-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-1 text-amber-800">
                    <Ship className="w-4.5 h-4.5" />
                    <span className="text-xs font-extrabold">{content.hero.routeCard.seaOption}</span>
                  </div>
                  <div className="text-xl font-black text-slate-800">
                    {content.hero.routeCard.seaDays}
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">{content.hero.routeCard.portsDest}</span>
                </motion.div>
              </div>

              {/* Interactive Route Map Visualizer */}
              <div className="relative bg-gradient-to-br from-[#0f2a4a] to-[#0a192f] rounded-2xl p-6 text-white mb-6 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="text-xs font-bold text-amber-400 mb-4 flex items-center justify-between">
                  <span>{content.hero.routeCard.title}</span>
                  <Container className="w-4.5 h-4.5 text-sky-300" />
                </div>

                <div className="flex items-center justify-between gap-2 relative my-5">
                  {/* Origin */}
                  <div className="text-center z-10">
                    <div className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mx-auto mb-1 text-base shadow-md">
                      🌍
                    </div>
                    <div className="text-xs font-bold text-white">{content.hero.routeCard.originHub}</div>
                    <div className="text-[10px] text-slate-300">{content.hero.routeCard.saHubsLabel}</div>
                  </div>

                  {/* Route Line Animation with moving plane */}
                  <div className="flex-1 relative flex items-center justify-center">
                    <div className="w-full h-0.5 border-t-2 border-dashed border-amber-400/80" />
                    <motion.div
                      animate={{ x: isRtl ? [-45, 45] : [45, -45] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute px-3 py-1 bg-amber-400 text-[#0f2a4a] font-black text-[11px] rounded-full shadow-lg flex items-center gap-1"
                    >
                      <Plane className="w-3.5 h-3.5 transform rotate-90" />
                      <span>{content.hero.routeCard.transitStatus}</span>
                    </motion.div>
                  </div>

                  {/* Destination */}
                  <div className="text-center z-10">
                    <div className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mx-auto mb-1 text-base shadow-md">
                      🇸🇾
                    </div>
                    <div className="text-xs font-bold text-white">{content.hero.routeCard.destHub}</div>
                    <div className="text-[10px] text-slate-300">{content.hero.routeCard.finalDeliveryLabel}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 text-xs text-slate-300 flex items-center justify-between font-medium">
                  <span>{content.hero.routeCard.liveContainer}</span>
                  <span className="text-emerald-400 font-black">{content.hero.routeCard.insuranceBadge}</span>
                </div>
              </div>

              {/* Direct Action Button */}
              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full navy-button py-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>{content.hero.routeCard.ctaBtn}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4 text-amber-400" /> : <ArrowRight className="w-4 h-4 text-amber-400" />}
              </button>

            </div>
          </motion.div>

        </div>

        {/* Stats Counter Bar Below Hero */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md flex flex-col items-center text-center hover:border-amber-400 transition-all">
            <div className="text-3xl sm:text-4xl font-black text-[#0f2a4a] mb-1">
              {content.hero.stats.containers}
            </div>
            <div className="text-xs font-bold text-slate-600">
              {content.hero.stats.containersLabel}
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md flex flex-col items-center text-center hover:border-amber-400 transition-all">
            <div className="text-3xl sm:text-4xl font-black text-amber-600 mb-1">
              {content.hero.stats.deliveryRate}
            </div>
            <div className="text-xs font-bold text-slate-600">
              {content.hero.stats.deliveryRateLabel}
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md flex flex-col items-center text-center hover:border-amber-400 transition-all">
            <div className="text-3xl sm:text-4xl font-black text-[#0f2a4a] mb-1">
              {content.hero.stats.syriaHubs}
            </div>
            <div className="text-xs font-bold text-slate-600">
              {content.hero.stats.syriaHubsLabel}
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md flex flex-col items-center text-center hover:border-amber-400 transition-all">
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 mb-1">
              {content.hero.stats.chinaWarehouses}
            </div>
            <div className="text-xs font-bold text-slate-600">
              {content.hero.stats.chinaWarehousesLabel}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
