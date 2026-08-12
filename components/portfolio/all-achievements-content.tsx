"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, ArrowLeft, Trophy, Search } from "lucide-react";
import { ACHIEVEMENTS, Achievement } from "@/lib/achievements";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { useExternalLinkConfirm } from "@/components/portfolio/external-link-modal";
import { cn } from "@/lib/utils";

export function AllAchievementsContent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { openConfirmation } = useExternalLinkConfirm();

  const filteredAchievements = React.useMemo(() => {
    if (!searchQuery.trim()) return ACHIEVEMENTS;
    const query = searchQuery.toLowerCase();
    return ACHIEVEMENTS.filter(
      (a) =>
        a.titleId.toLowerCase().includes(query) ||
        a.titleEn.toLowerCase().includes(query) ||
        a.organization.toLowerCase().includes(query) ||
        a.descriptionId.toLowerCase().includes(query) ||
        a.descriptionEn.toLowerCase().includes(query) ||
        a.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, title: string) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      openConfirmation(url, title);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "font-mono text-xs gap-1.5 rounded-lg text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowLeft className="size-3.5" />
          <span>{t("Kembali ke Beranda", "Back to Home")}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight">
          {t("Semua Pencapaian & Artikel Kegiatan", "All Achievements & Activity Articles")}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-2xl leading-relaxed">
          {t(
            "Arsip lengkap pengalaman mengikuti lomba jaringan komputer, posisi kepemimpinan, dan ulasan artikel kegiatan.",
            "Complete archive of networking competitions, leadership positions, and activity article reviews."
          )}
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md pt-2">
          <Search className="absolute left-3 top-5 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Cari lomba, posisi, atau kegiatan...", "Search competitions, roles, or activities...")}
            className="w-full pl-9 pr-4 py-2 text-xs font-sans rounded-xl bg-card border border-border/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Clean Minimal List (Exact Format from Reference Image) */}
      <div className="divide-y divide-border/40 w-full border-y border-border/40">
        {filteredAchievements.map((item, idx) => {
          const isExternal = Boolean(item.url);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
            >
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-card/40 transition-colors px-2 rounded-lg">
                {/* Left Side: Thumbnail Image + Title & Description */}
                <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                  <Link
                    href={`/achievements/${item.slug}`}
                    className="relative w-24 sm:w-36 aspect-video rounded-lg overflow-hidden border border-border/60 bg-secondary/30 shrink-0 shadow-xs block group-hover:border-primary/40 transition-colors"
                  >
                    <Image
                      src={item.cover}
                      alt={t(item.titleId, item.titleEn)}
                      fill
                      sizes="(max-width: 640px) 96px, 144px"
                      className="object-contain p-1 rounded-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <h3 className="text-base sm:text-xl font-bold font-sans tracking-tight text-foreground group-hover:text-primary transition-colors">
                      <Link href={`/achievements/${item.slug}`} className="hover:underline">
                        {t(item.titleId, item.titleEn)}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm font-sans text-muted-foreground line-clamp-2 leading-relaxed">
                      {t(item.descriptionId, item.descriptionEn)}
                    </p>

                    <div className="pt-0.5 flex items-center gap-2">
                      <span className="text-[11px] font-mono text-primary font-semibold">
                        {t(item.positionId, item.positionEn)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Stack Tags, Period & Detail Action Link */}
                <div className="flex md:flex-col md:items-end justify-between sm:justify-start gap-1.5 shrink-0 text-left md:text-right pt-1 md:pt-0">
                  <span className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.tags.slice(0, 3).join(" • ")}
                  </span>

                  <span className="text-[10px] font-mono text-muted-foreground/70">
                    {t(item.periodId, item.periodEn)}
                  </span>

                  <div className="flex items-center gap-3 pt-1">
                    {isExternal && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => handleLinkClick(e, item.url!, item.organization)}
                        className="text-xs font-mono text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="size-3" />
                      </a>
                    )}

                    <Link
                      href={`/achievements/${item.slug}`}
                      className="text-xs font-sans font-medium text-foreground hover:underline shrink-0"
                    >
                      {t("Detail →", "Detail →")}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12 space-y-2">
          <p className="text-sm text-muted-foreground font-sans">
            {t("Tidak ada artikel pencapaian yang sesuai dengan pencarian.", "No achievements match your search query.")}
          </p>
        </div>
      )}
    </div>
  );
}
