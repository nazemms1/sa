"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { HelpCircle, ChevronDown } from "lucide-react";

/**
 * Server-rendered FAQ. Uses native <details> so every answer is in the HTML
 * that crawlers see (and matches the FAQPage JSON-LD) while still collapsing.
 */
export const FaqSection: React.FC = () => {
  const { content } = useLanguage();
  const faq = content.faq;

  return (
    <section id="faq" className="py-24 bg-slate-50/80 relative overflow-hidden border-t border-slate-200/80">
      <div className="layout-container relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0f2a4a] text-xs font-black mb-3 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{faq.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {faq.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 font-semibold">
            {faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faq.items.map((item, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-amber-300 transition-colors"
            >
              <summary className="cursor-pointer list-none p-4 sm:p-5 font-extrabold text-[#0f2a4a] flex items-center justify-between gap-4 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm sm:text-base leading-snug">{item.question}</h3>
                <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-amber-600 shadow-sm">
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <div className="border-t border-slate-200 p-4 sm:p-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
