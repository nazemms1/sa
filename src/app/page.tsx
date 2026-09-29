"use client";

import React, { useState, useCallback } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RegionalGateways } from "@/components/gateways";
import { Airports } from "@/components/airports";
import { CustomsLookup } from "@/components/customs-lookup";
import { Services } from "@/components/services";
import { RouteProcess } from "@/components/route-process";
import { WhyUs } from "@/components/why-us";
import { FaqModal } from "@/components/faq";
import { Footer } from "@/components/footer";
import { QuoteModal } from "@/components/quote-modal";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [faqModalOpen, setFaqModalOpen] = useState(false);

  const handleOpenQuote = (serviceName?: string) => {
    setSelectedService(serviceName ?? "");
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
  };

  const handleCloseFaq = useCallback(() => setFaqModalOpen(false), []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-400 selection:text-slate-900">
      {/* Modern Sticky Light Header */}
      <Header onOpenQuoteModal={handleOpenQuote} onOpenFaq={() => setFaqModalOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* Redesigned High-Impact Light Mode Hero */}
        <Hero onOpenQuoteModal={handleOpenQuote} />

        {/* Key Regional Gateways (Latakia, Beirut, Aqaba & Mersin Ports) + Export */}
        <RegionalGateways />

        {/* Airports & Air Freight (Damascus, Amman, Beirut) */}
        <Airports />

        {/* Syrian Customs HS Code Lookup & Tariff Duty Estimator */}
        <CustomsLookup onOpenQuoteModal={handleOpenQuote} />

        {/* Services Grid (Air & Sea FCL/LCL, Transit, Customs, Project Cargo) */}
        <Services onOpenQuoteModal={handleOpenQuote} />

        {/* 5 Operational Pillars Process Journey */}
        <RouteProcess />

        {/* Corporate Strengths & Syria Logistics Experience */}
        <WhyUs />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Freight Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuote}
        initialService={selectedService}
      />

      {/* Importers FAQ Popup */}
      <FaqModal isOpen={faqModalOpen} onClose={handleCloseFaq} />
    </div>
  );
}
