"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import {
  Ship,
  Plane,
  Warehouse,
  FileCheck,
  Truck,
  Coins,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

interface ServicesProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuoteModal }) => {
  const { content, isRtl } = useLanguage();
  const serv = content.services;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ship":
        return <Ship className="w-7 h-7 text-amber-600" />;
      case "plane":
        return <Plane className="w-7 h-7 text-sky-600" />;
      case "warehouse":
        return <Warehouse className="w-7 h-7 text-emerald-600" />;
      case "file-check":
        return <FileCheck className="w-7 h-7 text-indigo-600" />;
      case "truck":
        return <Truck className="w-7 h-7 text-blue-600" />;
      case "coins":
        return <Coins className="w-7 h-7 text-yellow-600" />;
      default:
        return <Ship className="w-7 h-7 text-amber-600" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50/80 relative overflow-hidden">
      <div className="layout-container">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/90 text-[#0f2a4a] text-xs font-black mb-3">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{serv.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {serv.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {serv.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serv.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 sm:p-9 border border-slate-200 shadow-xl hover:shadow-2xl hover:border-amber-400 card-hover-effect flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="px-3.5 py-1 text-[11px] font-black rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#0f2a4a] mb-3 group-hover:text-amber-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                  {item.description}
                </p>

                <div className="space-y-2.5 border-t border-slate-100 pt-5 mb-6">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenQuoteModal(item.title)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#0f2a4a] bg-slate-50 border border-slate-200 hover:bg-[#0f2a4a] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{serv.detailsBtn}</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
