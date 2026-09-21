"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { ShieldCheck, Building2, Award, Clock, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WhyUs: React.FC = () => {
  const { content } = useLanguage();
  const why = content.whyUs;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shield-check":
        return <ShieldCheck className="w-8 h-8 text-amber-500" />;
      case "building-2":
        return <Building2 className="w-8 h-8 text-sky-500" />;
      case "award":
        return <Award className="w-8 h-8 text-emerald-500" />;
      case "clock":
        return <Clock className="w-8 h-8 text-indigo-500" />;
      default:
        return <Star className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <section id="whyus" className="py-24 bg-[#0a192f] text-white relative overflow-hidden">
      {/* Subtle Glow Spheres */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="layout-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-amber-300 text-xs font-black mb-3 backdrop-blur-md">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{why.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {why.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {why.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {why.features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-md p-8 sm:p-9 rounded-3xl border border-white/10 hover:border-amber-400/80 transition-all card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                  {getIcon(feat.icon)}
                </div>

                <h3 className="text-xl font-black text-white mb-3 leading-snug">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-amber-400">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>{why.guaranteeBadge}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
