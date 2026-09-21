"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { Calculator as CalcIcon, Ship, Plane, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CalculatorProps {
  onOpenQuoteModal: () => void;
}

export const ShippingCalculator: React.FC<CalculatorProps> = ({ onOpenQuoteModal }) => {
  const { content, isRtl } = useLanguage();
  const calc = content.calculator;

  const [mode, setMode] = useState<"sea" | "air">("sea");
  const [cbm, setCbm] = useState<number>(3.5);
  const [kg, setKg] = useState<number>(150);
  const [goods, setGoods] = useState<string>("general");
  const [dest, setDest] = useState<string>("damascus");

  const calculateCost = () => {
    if (mode === "sea") {
      let baseRate = 210;
      if (goods === "textiles") baseRate += 20;
      if (goods === "electronics") baseRate += 35;
      if (goods === "machinery") baseRate += 15;
      if (dest === "damascus" || dest === "aleppo") baseRate += 25;
      return Math.round(cbm * baseRate);
    } else {
      let baseRate = 11.5;
      if (goods === "electronics") baseRate += 2.5;
      if (goods === "textiles") baseRate += 1.0;
      return Math.round(kg * baseRate);
    }
  };

  const estimatedTotal = calculateCost();

  return (
    <section id="calculator" className="py-20 bg-white relative overflow-hidden border-t border-slate-200/80">
      <div className="layout-container">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-950 text-xs font-black mb-3">
            <CalcIcon className="w-4 h-4 text-amber-600" />
            <span>{calc.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {calc.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {calc.subtitle}
          </p>
        </div>

        {/* Main Calculator Layout */}
        <div className="max-w-6xl mx-auto bg-slate-50/90 rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Mode Switcher Tabs */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-2.5">
                {calc.shippingType}
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-200/80 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setMode("sea")}
                  className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2.5 ${
                    mode === "sea"
                      ? "bg-white text-[#0f2a4a] shadow-md border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Ship className="w-4.5 h-4.5 text-amber-600" />
                  <span>{calc.seaType}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("air")}
                  className={`py-3.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2.5 ${
                    mode === "air"
                      ? "bg-white text-[#0f2a4a] shadow-md border border-slate-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Plane className="w-4.5 h-4.5 text-sky-600" />
                  <span>{calc.airType}</span>
                </button>
              </div>
            </div>

            {/* Input fields based on Mode */}
            {mode === "sea" ? (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-black text-slate-700">
                    {calc.cbmLabel}
                  </label>
                  <span className="text-base font-black font-mono text-[#0f2a4a] bg-amber-100 px-3 py-1 rounded-xl border border-amber-300 shadow-sm">
                    {cbm} CBM
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={60}
                  step={0.5}
                  value={cbm}
                  onChange={(e) => setCbm(parseFloat(e.target.value))}
                  className="w-full accent-[#0f2a4a] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-bold font-mono mt-1.5">
                  <span>{calc.seaLclHint}</span>
                  <span>{calc.sea20Hint}</span>
                  <span>{calc.sea40Hint}</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-black text-slate-700">
                    {calc.weightLabel}
                  </label>
                  <span className="text-base font-black font-mono text-[#0f2a4a] bg-sky-100 px-3 py-1 rounded-xl border border-sky-300 shadow-sm">
                    {kg} KG
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={2000}
                  step={10}
                  value={kg}
                  onChange={(e) => setKg(parseInt(e.target.value))}
                  className="w-full accent-[#0f2a4a] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-bold font-mono mt-1.5">
                  <span>10 KG</span>
                  <span>500 KG</span>
                  <span>2000 KG</span>
                </div>
              </div>
            )}

            {/* Goods Type Selection */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-2">
                {calc.goodsType}
              </label>
              <select
                value={goods}
                onChange={(e) => setGoods(e.target.value)}
                className="w-full py-3.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0f2a4a]"
              >
                <option value="general">{calc.generalCargo}</option>
                <option value="textiles">{calc.textiles}</option>
                <option value="electronics">{calc.electronics}</option>
                <option value="machinery">{calc.machinery}</option>
              </select>
            </div>

            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-2">
                {calc.destCity}
              </label>
              <select
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                className="w-full py-3.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0f2a4a]"
              >
                <option value="damascus">{calc.destOptions.damascus}</option>
                <option value="lattakia">{calc.destOptions.lattakia}</option>
                <option value="tartous">{calc.destOptions.tartous}</option>
                <option value="aleppo">{calc.destOptions.aleppo}</option>
                <option value="homs">{calc.destOptions.homs}</option>
              </select>
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0f2a4a] to-[#0a192f] text-white p-7 sm:p-9 rounded-3xl shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-2">
                {calc.estimatedCost}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-6xl font-black font-mono text-amber-300">
                  ${estimatedTotal.toLocaleString()}
                </span>
                <span className="text-xs text-slate-300 font-extrabold">USD</span>
              </div>
              <span className="text-xs text-slate-300 block mt-2 font-medium">
                {mode === "sea" ? `${calc.cbmRateLabel} (${cbm} CBM)` : `${calc.kgRateLabel} (${kg} KG)`}
              </span>
            </div>

            {/* Included Services Checklist */}
            <div className="space-y-2.5 border-t border-white/10 pt-5 text-xs text-slate-200 font-semibold">
              {calc.includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 italic">
              {calc.disclaimer}
            </p>

            <button
              onClick={onOpenQuoteModal}
              className="gold-button w-full py-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{calc.confirmBtn}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
