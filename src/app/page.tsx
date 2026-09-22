"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RegionalGateways } from "@/components/gateways";
import { ChinaHolidays } from "@/components/china-holidays";
import { TrackingTool } from "@/components/tracking-tool";
import { Services } from "@/components/services";
import { ShippingCalculator } from "@/components/calculator";
import { RouteProcess } from "@/components/route-process";
import { WhyUs } from "@/components/why-us";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { QuoteModal } from "@/components/quote-modal";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDetails, setSelectedDetails] = useState("");
  const [activeTrackingCode, setActiveTrackingCode] = useState("");

  const handleOpenQuote = (serviceOrDetails?: string) => {
    if (serviceOrDetails) {
      if (serviceOrDetails.startsWith("نتائج الحاسبة:")) {
        setSelectedDetails(serviceOrDetails);
        setSelectedService("");
      } else {
        setSelectedService(serviceOrDetails);
        setSelectedDetails("");
      }
    } else {
      setSelectedService("");
      setSelectedDetails("");
    }
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
  };

  const handleSearchTracking = (code: string) => {
    setActiveTrackingCode(code);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-400 selection:text-slate-900">
      {/* Modern Sticky Light Header */}
      <Header onOpenQuoteModal={handleOpenQuote} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* Redesigned High-Impact Light Mode Hero */}
        <Hero
          onOpenQuoteModal={handleOpenQuote}
          onSearchTracking={handleSearchTracking}
        />

        {/* Key Regional Gateways (Latakia, Beirut & Aqaba Ports) */}
        <RegionalGateways />

        {/* China Official Holidays Announcement Card (Matching uploaded poster) */}
        <ChinaHolidays />

        {/* Interactive Live Cargo Tracking Simulator */}
        <TrackingTool initialCode={activeTrackingCode} />

        {/* Services Grid (Air & Sea FCL/LCL, Transit, Customs, Project Cargo) */}
        <Services onOpenQuoteModal={handleOpenQuote} />

        {/* Freight Cost Estimator & Rate Calculator */}
        <ShippingCalculator onOpenQuoteModal={handleOpenQuote} />

        {/* 5 Operational Pillars Process Journey */}
        <RouteProcess />

        {/* Corporate Strengths & Syria Logistics Experience */}
        <WhyUs />

        {/* Syrian Merchants Testimonials */}
        <Testimonials />

        {/* Importers FAQ Accordion */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Freight Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuote}
        initialService={selectedService}
        initialDetails={selectedDetails}
      />
    </div>
  );
}
