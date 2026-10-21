"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RegionalGateways } from "@/components/gateways";
import { Airports } from "@/components/airports";
import { CustomsLookup } from "@/components/customs-lookup";
import { Services } from "@/components/services";
import { RouteProcess } from "@/components/route-process";
import { WhyUs } from "@/components/why-us";
import { FaqSection } from "@/components/faq";
import { Footer } from "@/components/footer";
import { QuoteModal } from "@/components/quote-modal";

export function HomePage() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenQuote = (serviceName?: string) => {
    setSelectedService(serviceName ?? "");
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-400 selection:text-slate-900">
      <Header onOpenQuoteModal={handleOpenQuote} />

      <main className="flex-grow">
        <Hero onOpenQuoteModal={handleOpenQuote} />
        <RegionalGateways />
        <Airports />
        <CustomsLookup onOpenQuoteModal={handleOpenQuote} />
        <Services onOpenQuoteModal={handleOpenQuote} />
        <RouteProcess />
        <WhyUs />
        <FaqSection />
      </main>

      <Footer />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuote}
        initialService={selectedService}
      />
    </div>
  );
}
