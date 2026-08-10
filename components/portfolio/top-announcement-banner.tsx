"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function TopAnnouncementBanner() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-secondary/60 border-b border-border/40 text-foreground py-1.5 px-4 text-xs font-sans relative z-50 text-center">
      <a
        href="#contact"
        className="inline-flex items-center justify-center gap-1.5 font-semibold text-foreground/90 hover:text-primary transition-colors group"
      >
        <span>
          {t(
            "Terbuka untuk Kesempatan PKL / Magang",
            "Open for PKL / Internship Opportunities"
          )}
        </span>
        <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}
