"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/language-context";
import {
  Search,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Calculator,
  Scale,
  DollarSign,
  Send,
  MessageCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Loader2,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiveCustomsItem, LiveCustomsResponse } from "@/data/customs-data";

interface CustomsLookupProps {
  onOpenQuoteModal: (details?: string) => void;
}

export const CustomsLookup: React.FC<CustomsLookupProps> = ({
  onOpenQuoteModal,
}) => {
  const { isRtl } = useLanguage();

  // Search state
  const [searchQuery, setSearchQuery] = useState("950430");
  const [operationType, setOperationType] = useState<"import" | "export">("import");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live results state
  const [liveItems, setLiveItems] = useState<LiveCustomsItem[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [sourceUrl, setSourceUrl] = useState<string>(
    "https://hs-exp.net/hs_customs_search.php?q=950430&type=import&ch="
  );
  const [hasSearched, setHasSearched] = useState(false);

  // Estimator fields
  const [cargoQuantity, setCargoQuantity] = useState<number>(1);
  const [cargoValueUsd, setCargoValueUsd] = useState<number>(10000);

  const performLiveSearch = useCallback(
    async (queryToSearch: string, typeToSearch: "import" | "export") => {
      const q = queryToSearch.trim();
      if (!q) return;

      setLoading(true);
      setErrorMsg(null);

      try {
        const res = await fetch(
          `/api/customs-lookup?q=${encodeURIComponent(q)}&type=${typeToSearch}`
        );
        const data: LiveCustomsResponse = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "فشل الاتصال بقاعدة بيانات الجمارك");
        }

        setLiveItems(data.items || []);
        setSelectedItemIndex(0);
        setSourceUrl(data.sourceUrl);
        setHasSearched(true);
      } catch (err: unknown) {
        console.error("Live lookup error:", err);
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "حدث خطأ أثناء الاستعلام من قاعدة البيانات"
        );
        setLiveItems([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch initial real data on mount
  useEffect(() => {
    performLiveSearch("950430", "import");
  }, [performLiveSearch]);

  const handleSearchSubmit = (overrideQuery?: string) => {
    const q = overrideQuery !== undefined ? overrideQuery : searchQuery;
    if (overrideQuery !== undefined) {
      setSearchQuery(overrideQuery);
    }
    performLiveSearch(q, operationType);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  const currentItem = liveItems[selectedItemIndex] || null;

  // Real calculation based on live fetched fees
  const calculateEstimatedDuties = () => {
    if (!currentItem) return { fixedCost: 0, percentageCost: 0, clearance: 0, total: 0 };

    const fixedUnitCost = currentItem.fixedFeeAmount || 0;
    const fixedTotal = fixedUnitCost * (cargoQuantity || 0);

    const pctRate = currentItem.percentageTotal || 0;
    const percentageTotal = (cargoValueUsd || 0) * (pctRate / 100);

    // Look for clearance fee if returned in fees list
    const clearanceFeeObj = currentItem.fees.find((f) =>
      f.label.includes("تخليص")
    );
    let clearance = 100;
    if (clearanceFeeObj) {
      const m = clearanceFeeObj.value.match(/([0-9.]+)/);
      if (m) clearance = parseFloat(m[1]);
    }

    const total = Math.round(fixedTotal + percentageTotal + clearance);

    return {
      fixedCost: Math.round(fixedTotal),
      percentageCost: Math.round(percentageTotal),
      clearance,
      total,
    };
  };

  const calcBreakdown = calculateEstimatedDuties();

  const handleRequestClearance = () => {
    if (!currentItem) return;
    const text = isRtl
      ? `طلب تخليص جمركي للبند: ${currentItem.code} (${currentItem.title}) - الكمية: ${cargoQuantity} ${currentItem.unitType} - القيمة: ${cargoValueUsd}$ - إجمالي الرسوم التقديرية: ${calcBreakdown.total}$`
      : `Customs Clearance Request for HS Code: ${currentItem.code} (${currentItem.title}) - Quantity: ${cargoQuantity} - Value: $${cargoValueUsd} - Est. Duties: $${calcBreakdown.total}`;
    onOpenQuoteModal(`تخليص جمركي: ${text}`);
  };

  return (
    <section
      id="customs-lookup"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden border-t border-slate-200"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#0f2a4a_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="layout-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-950 text-xs font-black mb-3.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>
              {isRtl
                ? "بوابة الاستعلام المباشر من قاعدة بيانات الجمارك السورية"
                : "Live Syrian Customs Tariff Database Inquiry"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0f2a4a] tracking-tight">
            {isRtl ? (
              <>
                استعلام البند الجمركي <span className="text-amber-600">والرسوم الحقيقية</span>
              </>
            ) : (
              <>
                Live Syrian HS Code & <span className="text-amber-600">Customs Tariff Lookup</span>
              </>
            )}
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
            {isRtl
              ? "يتم جلب الرسوم والشروط النظامية لحظياً ومباشرةً من نظام التعريفة الجمركية السورية الرسمي بمجرد إدخال رقم البند أو المادة."
              : "Live duty rates and official customs requirements are fetched in real-time from the official Syrian Customs tariff system."}
          </p>
        </div>

        {/* Search & Input Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 mb-10">
          {/* Operation Type Switcher */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setOperationType("import");
                  performLiveSearch(searchQuery, "import");
                }}
                className={`py-2 px-6 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  operationType === "import"
                    ? "bg-[#0f2a4a] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>📥</span>
                <span>{isRtl ? "استيراد إلى سوريا" : "Import to Syria"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOperationType("export");
                  performLiveSearch(searchQuery, "export");
                }}
                className={`py-2 px-6 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  operationType === "export"
                    ? "bg-[#0f2a4a] text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>📤</span>
                <span>{isRtl ? "تصدير من سوريا" : "Export from Syria"}</span>
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-amber-600" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isRtl
                    ? "ابحث بأي رقم بند جمركي أو باسمه (مثال: 950430، 0101، أرز، خيول، حديد، دجاج)..."
                    : "Enter any HS Code or item name (e.g. 950430, 0101, rice, horses)..."
                }
                className="w-full ps-12 pe-10 py-4 text-base font-bold bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSearchSubmit()}
              className="py-4 px-8 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{isRtl ? "جاري الاستعلام..." : "Searching..."}</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>{isRtl ? "استعلام حي" : "Live Search"}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Real Test Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-bold">
              {isRtl ? "أمثلة حية من الموقع الرسمي:" : "Live Official Examples:"}
            </span>
            {[
              { code: "950430", labelAr: "ألعاب الفيديو والتسلية (950430)" },
              { code: "01012900", labelAr: "خيول (01012900)" },
              { code: "دجاج", labelAr: "دجاج" },
              { code: "أرز", labelAr: "أرز" },
              { code: "حديد", labelAr: "حديد" },
              { code: "قمح", labelAr: "قمح" },
            ].map((ex) => (
              <button
                key={ex.code}
                type="button"
                onClick={() => handleSearchSubmit(ex.code)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  searchQuery === ex.code
                    ? "bg-amber-100 border-amber-300 text-amber-950"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                }`}
              >
                {ex.labelAr}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="max-w-2xl mx-auto py-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white shadow-lg border border-slate-200 text-[#0f2a4a] font-bold text-sm">
              <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
              <span>
                {isRtl
                  ? "جاري الاتصال المباشر بقاعدة بيانات التعريفة الجمركية السورية وجلب البنود والرسوم..."
                  : "Connecting directly to Syrian Customs database and extracting live tariff..."}
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && errorMsg && (
          <div className="max-w-3xl mx-auto p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-900 mb-8">
            <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
            <p className="font-bold text-base mb-2">{errorMsg}</p>
            <p className="text-xs text-rose-700 mb-4">
              {isRtl
                ? "يمكنك المحاولة مجدداً أو التحقق مباشرة عبر رابط البوابة الرسمية:"
                : "You can retry or inspect the official portal link directly:"}
            </p>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow hover:bg-rose-700"
            >
              <span>{isRtl ? "فتح الموقع الرسمي للجمارك" : "Open Official Customs Site"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Empty State */}
        {!loading && !errorMsg && hasSearched && liveItems.length === 0 && (
          <div className="max-w-2xl mx-auto p-8 bg-white border border-slate-200 rounded-3xl text-center shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-[#0f2a4a] mb-1">
              {isRtl ? "لم يتم العثور على نتائج" : "No Customs Records Found"}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {isRtl
                ? `لم يتم العثور على بنود جمركية مطابقة لـ "${searchQuery}". تأكد من صحة رقم البند الجمركي أو جرّب البحث بكلمة عامة مثل: حديد، خيول، أرز.`
                : `No matching records for "${searchQuery}". Please verify the HS code.`}
            </p>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <span>{isRtl ? "البحث في البوابة الرسمية" : "Search in Official Portal"}</span>
              <ExternalLink className="w-4 h-4 text-amber-600" />
            </a>
          </div>
        )}

        {/* Live Results Section */}
        <AnimatePresence mode="wait">
          {!loading && currentItem && (
            <motion.div
              key={currentItem.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              {/* Multiple Results Selector (if query returned > 1 item) */}
              {liveItems.length > 1 && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md">
                  <div className="flex items-center gap-2 mb-3 text-xs font-black text-[#0f2a4a]">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>
                      {isRtl
                        ? `تم العثور على (${liveItems.length}) بند جمركي مطابق – اختر البند لعرض تفاصيله:`
                        : `Found (${liveItems.length}) matching items – click to inspect:`}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {liveItems.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedItemIndex(idx)}
                        className={`py-2 px-3.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-start flex items-center gap-2 ${
                          selectedItemIndex === idx
                            ? "bg-[#0f2a4a] text-white border-[#0f2a4a] shadow-md"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        <span className="font-mono text-amber-400 font-black">
                          {item.code}
                        </span>
                        <span className="line-clamp-1 max-w-[200px]">
                          {item.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Result Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90 relative overflow-hidden">
                {/* Header Badge & Code */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#0f2a4a] text-white font-mono font-black text-sm tracking-wider shadow-sm">
                      كود HS: {currentItem.code}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-500">
                      {currentItem.chapter}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border ${
                      currentItem.statusType === "allowed"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : currentItem.statusType === "restricted"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-rose-50 text-rose-800 border-rose-200"
                    }`}
                  >
                    {currentItem.statusType === "allowed" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : currentItem.statusType === "restricted" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{currentItem.status}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mt-6 mb-8">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0f2a4a] leading-snug">
                    {currentItem.title}
                  </h3>
                </div>

                {/* Customs Duties Grid (Extracted Live from Official site) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
                  {currentItem.fees.map((fee, idx) => {
                    const isTotal =
                      fee.label.includes("سلفة مالية + رسم انفاق") ||
                      fee.label.includes("إجمالي");
                    const isDuty =
                      fee.label.includes("رسوم الاستيراد") ||
                      fee.label.includes("رسم الاستيراد");
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          isTotal
                            ? "bg-gradient-to-b from-amber-50 to-amber-100/70 border-amber-300 ring-2 ring-amber-400/20"
                            : isDuty
                            ? "bg-slate-50 border-slate-200 ring-1 ring-slate-200"
                            : "bg-slate-50/60 border-slate-200/80"
                        }`}
                      >
                        <span className="block text-[11px] font-bold text-slate-500 mb-1.5 line-clamp-1">
                          {fee.label}
                        </span>
                        <span
                          className={`block font-black tracking-tight ${
                            isTotal
                              ? "text-lg text-amber-950 font-mono"
                              : isDuty
                              ? "text-lg text-[#0f2a4a] font-mono"
                              : "text-base text-slate-800 font-mono"
                          }`}
                        >
                          {fee.value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Instant Duties Calculator */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0f2a4a] to-[#1a4473] text-white rounded-3xl shadow-xl mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-black text-white">
                          {isRtl
                            ? "حاسبة الرسوم الجمركية التقديرية للبضاعة"
                            : "Estimated Customs Duties Calculator"}
                        </h4>
                        <p className="text-xs text-white/70">
                          {isRtl
                            ? "أدخل الكمية وقيمة الفاتورة لحساب الجمركة المتوقعة بالدولار"
                            : "Enter cargo quantity and goods value to estimate expected customs"}
                        </p>
                      </div>
                    </div>

                    <div className="text-end">
                      <span className="text-xs text-white/60 block">
                        {isRtl ? "المجموع الجمركي التقديري" : "Estimated Total Duties"}
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                        ${calcBreakdown.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Calculator Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-2 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          {isRtl
                            ? `الكمية الإجمالية (${currentItem.unitType})`
                            : `Cargo Quantity (${currentItem.unitType})`}
                        </span>
                      </label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.5"
                        value={cargoQuantity}
                        onChange={(e) =>
                          setCargoQuantity(
                            Math.max(0, parseFloat(e.target.value) || 0)
                          )
                        }
                        className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white font-mono font-black placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/80 mb-2 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          {isRtl
                            ? "قيمة الفاتورة الجمركية للبضاعة (USD)"
                            : "Invoice CIF Value (USD)"}
                        </span>
                      </label>
                      <input
                        type="number"
                        min="100"
                        step="500"
                        value={cargoValueUsd}
                        onChange={(e) =>
                          setCargoValueUsd(
                            Math.max(0, parseFloat(e.target.value) || 0)
                          )
                        }
                        className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white font-mono font-black placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  {/* Calculations Details Pill */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/80">
                    <div>
                      <span className="text-white/60">
                        {isRtl ? "رسم الاستيراد بالوزن/الوحدة: " : "Import Duty (Qty × Rate): "}
                      </span>
                      <span className="font-mono font-bold text-white">
                        ${calcBreakdown.fixedCost.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-white/60">
                        {isRtl
                          ? `الرسوم المئوية من القيمة (${currentItem.percentageTotal}%): `
                          : `Value Taxes (${currentItem.percentageTotal}%): `}
                      </span>
                      <span className="font-mono font-bold text-white">
                        ${calcBreakdown.percentageCost.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-white/60">
                        {isRtl ? "الكشف والتخليص: " : "Clearance & Inspection: "}
                      </span>
                      <span className="font-mono font-bold text-white">
                        ${calcBreakdown.clearance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Requirements & Notes from Official Decree */}
                {currentItem.notes && (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8">
                    <div className="flex items-center gap-2 mb-3 text-[#0f2a4a] font-black text-sm">
                      <FileCheck2 className="w-4 h-4 text-amber-600" />
                      <span>
                        {isRtl
                          ? "المتطلبات، الملاحظات واشتراطات التخليص الرسمية:"
                          : "Official Customs Requirements & Decrees:"}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-white p-4 rounded-xl border border-slate-200/80">
                      {currentItem.notes}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleRequestClearance}
                      className="flex-1 sm:flex-initial py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isRtl
                          ? "طلب تخليص جمركي لهذه الشحنة"
                          : "Request Clearance for this Item"}
                      </span>
                    </button>

                    <a
                      href="https://wa.me/963965101647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>
                        {isRtl ? "استشارة مخلص عبر واتساب" : "Chat on WhatsApp"}
                      </span>
                    </a>
                  </div>

                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-[#0f2a4a] transition-colors py-2 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <span>
                      {isRtl
                        ? "عرض البند على موقع التعريفة الرسمي (hs-exp.net)"
                        : "View on Official Site"}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Informational Guidance Box */}
        <div className="mt-12 max-w-4xl mx-auto p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-4 text-xs text-amber-950">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">
              {isRtl
                ? "بيانات حية مباشرة من التعريفة الجمركية السورية:"
                : "Live Data Directly from Syrian Customs Tariff:"}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isRtl
                ? "يتم جلب هذه البيانات ورسوم الاستيراد والإنفاق الاستهلاكي والملاحظات في الوقت الحقيقي من خوادم التعريفة الجمركية السورية الرسمية دون أي بيانات افتراضية، مما يضمن دقة ومطابقة البنود لأحدث القرارات الصادرة."
                : "All data, fees and legal notes are pulled in real time directly from official Syrian customs database with zero mock data."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
