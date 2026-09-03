"use client";

import * as React from "react";
import { Navbar } from "@/components/portfolio/navbar";
import { TopAnnouncementBanner } from "@/components/portfolio/top-announcement-banner";
import { Footer } from "@/components/portfolio/footer";
import { ExternalLinkConfirmProvider } from "@/components/portfolio/external-link-modal";

import { FloatingSectionTracker } from "@/components/portfolio/floating-section-tracker";

export function MainWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ExternalLinkConfirmProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased border-x border-dashed border-border/60 max-w-6xl mx-auto relative">
        <FloatingSectionTracker />
        <TopAnnouncementBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </ExternalLinkConfirmProvider>
  );
}
