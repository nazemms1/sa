"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { Star, Quote, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials: React.FC = () => {
  const { content } = useLanguage();
  const test = content.testimonials;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      <div className="layout-container">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-950 text-xs font-black mb-3">
            <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{test.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {test.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {test.subtitle}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {test.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-8 sm:p-9 rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl hover:border-amber-400 transition-all flex flex-col justify-between relative group card-hover-effect"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4.5 h-4.5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-9 h-9 text-amber-200 group-hover:text-amber-400 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6 font-semibold">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-[#0f2a4a]">{item.name}</h4>
                  <span className="text-xs text-slate-500 font-bold block">{item.company}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{item.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
