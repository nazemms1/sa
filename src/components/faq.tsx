"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Faq: React.FC = () => {
  const { content } = useLanguage();
  const faq = content.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white/80 relative overflow-hidden border-t border-slate-200/80">
      <div className="layout-container">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[#0f2a4a] text-xs font-black mb-3">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{faq.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {faq.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-5xl mx-auto space-y-4">
          {faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-amber-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-right rtl:text-right ltr:text-left font-extrabold text-[#0f2a4a] flex items-center justify-between gap-4 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-base sm:text-xl leading-snug">{item.question}</span>
                  <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-amber-600 shadow-sm">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-200 bg-white p-6 text-sm text-slate-600 leading-relaxed font-semibold"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
