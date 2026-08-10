"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function TopAnnouncementBanner() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-secondary/80 border-b border-border/50 text-foreground py-2 px-4 text-xs font-sans relative z-50 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Empty left spacer to center the text cleanly */}
        <div className="hidden sm:block w-24" />

        {/* Center/Main Announcement Text */}
        <div className="flex items-center gap-2 font-medium tracking-tight mx-auto sm:mx-0">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-muted-foreground hidden sm:inline">
            {t("Status Karir:", "Career Status:")}
          </span>
          <span className="font-semibold text-foreground">
            {t(
              "Terbuka untuk Kesempatan PKL / Magang (Open for Network Engineer Internship / PKL)",
              "Open for Network Engineer Internship / PKL Opportunities"
            )}
          </span>
        </div>

        {/* Right CTA Link persis seperti 'Make your AI a shadcn expert ->' pada banner shadcn.io */}
        <a
          href="#contact"
          className="flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors shrink-0 group text-xs"
        >
          <span>{t("Hubungi Saya", "Get in Touch")}</span>
          <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
