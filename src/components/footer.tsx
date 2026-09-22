"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { Ship, Phone, Mail, MapPin, MessageSquare, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { content } = useLanguage();
  const foot = content.footer;
  const cont = content.contact;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#0a192f]/94 text-white pt-20 pb-12 relative overflow-hidden border-t border-slate-800">
      <div className="layout-container">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0f2a4a] p-2.5 border border-amber-500/40 flex items-center justify-center shadow-lg">
                <Ship className="w-7 h-7 text-amber-400" />
              </div>
              <span className="text-2xl font-black tracking-tight font-sans text-white">
                S.A.<span className="text-[#c5a059]">LOGISTICS</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {foot.description}
            </p>

            <div className="pt-2 text-xs font-black text-amber-400 font-mono">
              {foot.chinaTagline}
            </div>
          </div>

          {/* Column 2: China & Global Hubs */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">
              {cont.chinaTitle} 🇨🇳
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{cont.guangzhouAddress}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{cont.yiwuAddress}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Syria Main Office */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">
              {cont.syriaTitle} 🇸🇾
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{cont.officialAddress}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{cont.lattakiaAddress}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">
              {cont.phoneLabel}
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-bold">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-amber-400" />
                <span dir="ltr">{cont.officialPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-amber-400" />
                <span>{cont.officialEmail}</span>
              </div>
            </div>

            <a
              href="https://wa.me/963966642574"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors shadow-lg mt-3"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              <span>{cont.whatsappBtn}</span>
            </a>
          </div>

        </div>

        {/* Bottom Rights Strip */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-semibold">
          <div>{foot.rights}</div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-800 hover:bg-[#0f2a4a] text-amber-400 border border-slate-700 transition-colors flex items-center gap-2 font-bold shadow-md"
          >
            <span>{foot.backToTop}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
