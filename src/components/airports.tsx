"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { Plane, PlaneLanding, Clock } from "lucide-react";
import { motion } from "framer-motion";

export const Airports: React.FC = () => {
  const { content } = useLanguage();
  const air = content.airports;

  return (
    <section id="airports" className="py-20 bg-white/80 relative overflow-hidden border-b border-slate-200/80">
      <div className="layout-container relative z-10">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-900 text-xs font-black mb-3">
            <Plane className="w-4 h-4 text-sky-600" />
            <span>{air.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {air.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {air.subtitle}
          </p>

          {/* Air Freight Transit Time from China */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#0f2a4a] text-white shadow-lg">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-slate-200">{air.transitLabel}</span>
            <span className="text-base sm:text-lg font-black text-amber-400">{air.transitDays}</span>
          </div>
        </div>

        {/* Airport Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {air.items.map((airport) => (
            <motion.div
              key={airport.title}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-sky-400 transition-all text-center shadow-md hover:shadow-xl group"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <PlaneLanding className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#0f2a4a] mb-2">{airport.title}</h3>
              <span className="text-xs font-bold text-slate-600 block bg-slate-100 py-1 px-3 rounded-full w-fit mx-auto">
                {airport.badge}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
