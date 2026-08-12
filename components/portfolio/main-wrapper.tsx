"use client";

import * as React from "react";
import { Navbar } from "@/components/portfolio/navbar";
import { TopAnnouncementBanner } from "@/components/portfolio/top-announcement-banner";
import { Footer } from "@/components/portfolio/footer";
import { Project } from "@/lib/projects";

import { FloatingSectionTracker } from "@/components/portfolio/floating-section-tracker";

export function MainWrapper({
  children,
  projects
}: {
  children: React.ReactNode;
  projects?: Project[];
}) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased border-x border-dashed border-border/60 max-w-6xl mx-auto relative">
      <FloatingSectionTracker />
      <TopAnnouncementBanner />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
