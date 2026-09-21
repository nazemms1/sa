"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { Calendar, Moon, Building2, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const ChinaHolidays: React.FC = () => {
  const { content } = useLanguage();
  const notice = content.holidaysNotice;

  return (
    <section id="holidays" className="py-20 bg-white relative overflow-hidden border-y border-slate-200/80">
      <div className="layout-container">
        
        {/* Section Title Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-xs font-black mb-3 shadow-sm"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600 animate-bounce" />
            <span>{notice.tag}</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {notice.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {notice.subtitle}
          </p>
        </div>

        {/* Main Poster-styled Light Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-slate-50 via-white to-amber-50/50 rounded-3xl p-6 sm:p-12 border border-amber-200/90 shadow-2xl shadow-slate-200/70 relative overflow-hidden"
        >
          {/* Watermark */}
          <div className="absolute top-4 right-4 text-slate-200/25 text-9xl font-black select-none pointer-events-none font-sans">
            CHINA
          </div>

          {/* Card Top Title Banner */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-[#0f2a4a] to-[#0a192f] text-white p-5 rounded-2xl mb-10 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-[#0f2a4a] flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-amber-300">{notice.mainScheduleTitle}</h3>
              <p className="text-xs text-slate-200 font-semibold">Official Public Holidays Schedule in China</p>
            </div>
          </div>

          {/* Holidays Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {notice.holidays.map((h) => (
              <motion.div
                key={h.id}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-lg hover:border-amber-400 hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center shadow-inner">
                      {h.icon === "moon" ? (
                        <Moon className="w-7 h-7 text-amber-600" />
                      ) : (
                        <Building2 className="w-7 h-7 text-[#0f2a4a]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#0f2a4a]">{h.name}</h4>
                      <span className="text-xs text-slate-500 font-bold">{notice.holidayClosure}</span>
                    </div>
                  </div>

                  {/* Dates Box */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-center justify-around text-center shadow-inner">
                    <div>
                      <span className="text-xs font-bold text-slate-500 block mb-1">
                        {notice.fromText}
                      </span>
                      <span className="text-lg font-black text-[#0f2a4a] font-mono dir-ltr">
                        {h.startDate}
                      </span>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 block mb-1">
                        {notice.toText}
                      </span>
                      <span className="text-lg font-black text-amber-700 font-mono dir-ltr">
                        {h.endDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-black text-emerald-700">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                  <span>{notice.verifiedBadge}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Important Notice & Advice Box */}
          <div className="bg-amber-100/90 border border-amber-300 rounded-2xl p-6 text-amber-950 flex flex-col sm:flex-row gap-5 items-start shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold shadow-md">
              <Lightbulb className="w-7 h-7 text-slate-950" />
            </div>
            <div className="space-y-1.5">
              <h5 className="text-base font-black text-[#0f2a4a]">
                {notice.adviceTitle}
              </h5>
              <p className="text-xs sm:text-sm leading-relaxed text-amber-950 font-bold">
                {notice.adviceText}
              </p>
              <p className="text-xs text-slate-700 pt-2 border-t border-amber-200/90 font-semibold">
                {notice.alertMessage}
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
