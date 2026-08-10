"use client";

import * as React from "react";
import { useLanguage } from "@/components/language-provider";

export function TopAnnouncementBanner() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-secondary/60 border-b border-border/40 text-foreground py-1.5 px-4 text-xs font-sans relative z-50 text-center">
      <span className="font-semibold text-foreground/90">
        {t(
          "Terbuka untuk Kesempatan PKL / Magang",
          "Open for PKL / Internship Opportunities"
        )}
      </span>
    </div>
  );
}
