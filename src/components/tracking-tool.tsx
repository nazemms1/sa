"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { sampleTrackingData, TrackingResult } from "@/data/content";
import {
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TrackingToolProps {
  initialCode?: string;
}

export const TrackingTool: React.FC<TrackingToolProps> = ({ initialCode = "" }) => {
  const { content, lang, isRtl } = useLanguage();
  const [searchCode, setSearchCode] = useState(initialCode);

  const activeTrackingData = sampleTrackingData[lang] || sampleTrackingData.ar;

  const [activeResult, setActiveResult] = useState<TrackingResult | null>(
    activeTrackingData["SA-8842-SY"]
  );

  useEffect(() => {
    if (activeTrackingData[searchCode.trim().toUpperCase()]) {
      setActiveResult(activeTrackingData[searchCode.trim().toUpperCase()]);
    } else {
      setActiveResult(activeTrackingData["SA-8842-SY"]);
    }
  }, [lang]);

  useEffect(() => {
    if (initialCode) {
      setSearchCode(initialCode);
      handleSearchCode(initialCode);
    }
  }, [initialCode]);

  const handleSearchCode = (codeToSearch: string) => {
    const trimmed = codeToSearch.trim().toUpperCase();
    if (!trimmed) return;

    if (activeTrackingData[trimmed]) {
      setActiveResult(activeTrackingData[trimmed]);
    } else {
      const customResult: TrackingResult = {
        code: trimmed,
        status: isRtl ? "الشحنة في المرحلة الجمركية الأولى" : "Cargo in Initial Customs Processing",
        statusColor: "bg-blue-100 text-blue-800 border-blue-300",
        origin: isRtl ? "مستودع إيوا المركز (الصين)" : "Yiwu Central Hub (China)",
        destination: isRtl ? "دمشق - سوريا" : "Damascus - Syria",
        type: isRtl ? "شحن بحري حاوية 40 قدم" : "Sea Freight 40ft HQ Container",
        estimatedDelivery: isRtl ? "30 أيلول 2026" : "Sep 30, 2026",
        weight: "5,800 KG",
        volume: "24.0 CBM",
        steps: [
          { title: isRtl ? "استلام وتفريغ البضائع" : "Cargo Collection & Sorting", date: "Sep 15, 2026", location: isRtl ? "مستودع إيوا" : "Yiwu Hub", completed: true },
          { title: isRtl ? "الفحص وإصدار المانيفست" : "QC & Manifest Issuance", date: "Sep 17, 2026", location: "China", completed: true, current: true },
          { title: isRtl ? "التحميل على السفينة" : "Vessel Loading", date: "Sep 20, 2026", location: "Ningbo Port", completed: false },
          { title: isRtl ? "الإبحار نحو اللاذقية" : "Sailing to Syria", date: "Sep 22, 2026", location: "Maritime Route", completed: false },
          { title: isRtl ? "التخريج الجمركي السوري" : "Syrian Port Clearance", date: "Sep 29, 2026", location: "Lattakia Port", completed: false },
        ],
      };
      setActiveResult(customResult);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchCode(searchCode);
  };

  return (
    <section id="tracking" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="layout-container">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-[#0f2a4a] text-xs font-black mb-3">
            <Package className="w-4 h-4 text-blue-700" />
            <span>{content.tracking.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {content.tracking.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {content.tracking.subtitle}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={onSubmit} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xl flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5.5 h-5.5 text-slate-400 absolute right-4 left-auto rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder={content.tracking.inputPlaceholder}
                className="w-full py-3.5 px-12 text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2a4a] focus:bg-white text-slate-800 font-extrabold uppercase tracking-wider placeholder:normal-case placeholder:font-normal"
              />
            </div>
            <button
              type="submit"
              className="navy-button px-9 py-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{content.tracking.trackBtn}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4 text-amber-400" /> : <ArrowRight className="w-4 h-4 text-amber-400" />}
            </button>
          </form>

          {/* Quick Demo Sample Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-600">
            <span className="font-bold text-slate-500">{content.tracking.sampleClick}</span>
            {content.tracking.demoCodes.map((code) => (
              <button
                key={code}
                onClick={() => {
                  setSearchCode(code);
                  handleSearchCode(code);
                }}
                className="px-3.5 py-1.5 bg-white hover:bg-[#0f2a4a] hover:text-white text-[#0f2a4a] font-mono font-black rounded-xl border border-slate-300 transition-all shadow-sm hover:shadow-md"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Result Card Display */}
        <AnimatePresence mode="wait">
          {activeResult && (
            <motion.div
              key={activeResult.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
            >
              {/* Card Header Bar */}
              <div className="bg-gradient-to-r from-slate-900 to-[#0f2a4a] text-white p-7 sm:p-9 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
                      {content.tracking.trackingCodeLabel}
                    </span>
                    <span className={`px-3 py-1 text-xs font-black rounded-full border ${activeResult.statusColor}`}>
                      {activeResult.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-mono tracking-wider text-white">
                    {activeResult.code}
                  </h3>
                </div>

                <div className="bg-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md text-xs font-bold text-slate-200 border border-white/10">
                  <span>{content.tracking.etaLabel}: </span>
                  <span className="text-amber-400 font-extrabold">{activeResult.estimatedDelivery}</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-7 bg-slate-50/90 border-b border-slate-200 text-slate-800 text-xs font-bold">
                <div>
                  <span className="text-slate-500 block mb-1 font-semibold">{content.tracking.originLabel}</span>
                  <span className="font-extrabold text-[#0f2a4a] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500" />
                    {activeResult.origin}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1 font-semibold">{content.tracking.destLabel}</span>
                  <span className="font-extrabold text-[#0f2a4a] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    {activeResult.destination}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1 font-semibold">{content.tracking.weightLabel}</span>
                  <span className="font-extrabold text-slate-900 font-mono text-sm">{activeResult.weight}</span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1 font-semibold">{content.tracking.volLabel}</span>
                  <span className="font-extrabold text-slate-900 font-mono text-sm">{activeResult.volume}</span>
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="p-7 sm:p-10">
                <h4 className="text-base font-black text-[#0f2a4a] mb-8 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span>{content.tracking.journeyTitle}</span>
                </h4>

                <div className="relative space-y-6 before:absolute before:inset-0 before:right-4 rtl:before:right-4 ltr:before:left-4 before:w-0.5 before:bg-slate-200">
                  {activeResult.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Circle Indicator */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs flex-shrink-0 z-10 transition-colors ${
                          step.completed
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                            : step.current
                            ? "bg-amber-500 text-slate-950 ring-4 ring-amber-100 animate-pulse"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {step.completed ? <CheckCircle2 className="w-4.5 h-4.5" /> : idx + 1}
                      </div>

                      {/* Content Details */}
                      <div className="flex-1 bg-slate-50/90 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-amber-300 transition-colors">
                        <div>
                          <h5 className="text-base font-bold text-[#0f2a4a]">{step.title}</h5>
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {step.location}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-auto shadow-sm">
                          {step.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
