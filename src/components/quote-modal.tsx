"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { X, Send, CheckCircle2, Sparkles, Ship, Plane } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { content } = useLanguage();
  const modalContent = content.quoteModal;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cargo: "",
    type: "sea",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 rtl:left-4 ltr:right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#0f2a4a]">{modalContent.successTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto font-medium">
                {modalContent.successMessage}
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-black mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{modalContent.responseGuarantee}</span>
                </div>
                <h3 className="text-2xl font-black text-[#0f2a4a]">{modalContent.title}</h3>
                <p className="text-xs text-slate-500 mt-1 font-semibold">{modalContent.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={modalContent.namePlaceholder}
                    className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2a4a] text-slate-800 font-semibold"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={modalContent.phonePlaceholder}
                    className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2a4a] text-slate-800 font-semibold font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "sea" })}
                    className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      formData.type === "sea"
                        ? "bg-[#0f2a4a] text-white border-[#0f2a4a]"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <Ship className="w-4 h-4 text-amber-400" />
                    <span>{modalContent.seaOptionBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "air" })}
                    className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      formData.type === "air"
                        ? "bg-[#0f2a4a] text-white border-[#0f2a4a]"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <Plane className="w-4 h-4 text-sky-400" />
                    <span>{modalContent.airOptionBtn}</span>
                  </button>
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder={modalContent.detailsPlaceholder}
                    className="w-full p-3.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2a4a] text-slate-800 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="gold-button w-full py-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{modalContent.submitBtn}</span>
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
