"use client";

import * as React from "react";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { ExternalLinkConfirmProvider } from "@/components/portfolio/external-link-modal";

export function MainWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ExternalLinkConfirmProvider>
      <div className="min-h-screen max-w-[768px] mx-auto flex flex-col bg-background text-foreground border-x-0 sm:border-x border-border selection:bg-foreground selection:text-background font-sans antialiased relative">
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
