"use client";

import * as React from "react";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { ExternalLinkConfirmProvider } from "@/components/portfolio/external-link-modal";
import { FishBackground } from "@/components/portfolio/fish-background";
import { FloatingBadge } from "@/components/portfolio/floating-badge";

export function MainWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ExternalLinkConfirmProvider>
      <FishBackground />
      <FloatingBadge />
      <div className="min-h-screen max-w-[768px] mx-auto flex flex-col bg-background/90 backdrop-blur-[2px] text-foreground border-x-0 sm:border-x border-border selection:bg-primary/20 selection:text-foreground font-sans antialiased relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md focus:text-sm font-medium shadow-md"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 px-4 sm:px-10 outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </ExternalLinkConfirmProvider>
  );
}
