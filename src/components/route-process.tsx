"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { Route, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const RouteProcess: React.FC = () => {
  const { content } = useLanguage();
  const proc = content.process;

  return (
    <section id="process" className="py-24 bg-white/80 relative overflow-hidden border-t border-slate-200/80">
      <div className="layout-container">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-950 text-xs font-black mb-3">
            <Route className="w-4 h-4 text-amber-600" />
            <span>{proc.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {proc.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {proc.subtitle}
          </p>
        </div>

        {/* Horizontal Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {proc.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-slate-50 p-7 rounded-3xl border border-slate-200 shadow-lg hover:border-amber-400 hover:shadow-2xl transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-4xl font-black font-mono text-amber-500 group-hover:text-amber-600 transition-colors">
                    {step.number}
                  </span>
                  <div className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-[11px] font-bold text-slate-600 flex items-center gap-1 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{step.location}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-[#0f2a4a] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-emerald-700 font-extrabold">
                <span>{proc.securedBadge}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
