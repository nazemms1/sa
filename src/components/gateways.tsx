"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { Anchor, Ship, CheckCircle2, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

export const RegionalGateways: React.FC = () => {
  const { content } = useLanguage();
  const gate = content.gateways;

  return (
    <section id="gateways" className="py-24 bg-gradient-to-br from-[#0f2a4a] via-[#0a192f] to-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="layout-container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-amber-300 text-xs font-black mb-3 backdrop-blur-md border border-white/10">
            <Anchor className="w-4 h-4 text-amber-400" />
            <span>{gate.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {gate.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {gate.subtitle}
          </p>
        </div>

        {/* 3 Main Ports Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          
          {/* Latakia Port */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/15 hover:border-amber-400/80 transition-all text-center relative overflow-hidden group shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <Ship className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-amber-300 mb-2">{gate.latakiaTitle}</h3>
            <span className="text-xs font-bold text-slate-300 block bg-white/10 py-1 px-3 rounded-full w-fit mx-auto">
              Main Marine Gateway 🇸🇾
            </span>
          </motion.div>

          {/* Beirut Port */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/15 hover:border-amber-400/80 transition-all text-center relative overflow-hidden group shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-sky-400/20 text-sky-300 border border-sky-400/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <Globe2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-sky-300 mb-2">{gate.beirutTitle}</h3>
            <span className="text-xs font-bold text-slate-300 block bg-white/10 py-1 px-3 rounded-full w-fit mx-auto">
              Regional Transit Gateway 🇱🇧
            </span>
          </motion.div>

          {/* Aqaba Port */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/15 hover:border-amber-400/80 transition-all text-center relative overflow-hidden group shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <Anchor className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-emerald-300 mb-2">{gate.aqabaTitle}</h3>
            <span className="text-xs font-bold text-slate-300 block bg-white/10 py-1 px-3 rounded-full w-fit mx-auto">
              Red Sea Transit Gateway 🇯🇴
            </span>
          </motion.div>

        </div>

        {/* 8 Feature Pills Grid */}
        <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-extrabold text-slate-200">
            {gate.features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
