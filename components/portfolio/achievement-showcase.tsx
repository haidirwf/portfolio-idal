"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ACHIEVEMENTS, Achievement } from "@/lib/achievements";
import { useLanguage } from "@/components/language-provider";
import { ExternalLink, Trophy, ArrowRight, Award } from "lucide-react";
import { useExternalLinkConfirm } from "@/components/portfolio/external-link-modal";
import { Badge } from "@/components/ui/badge";

export function AchievementShowcase() {
  const { t } = useLanguage();
  const { openConfirmation } = useExternalLinkConfirm();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, title: string) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      openConfirmation(url, title);
    }
  };

  return (
    <section id="achievements" className="py-12 px-4 sm:px-6 space-y-8 relative">
      {/* Section Header (Centered layout matching Project Showcase) */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Pencapaian & Kegiatan", "Achievements & Activities")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          {t(
            "Pengalaman mengikuti lomba jaringan, posisi kepemimpinan, dan ulasan artikel kegiatan.",
            "Networking competition experience, leadership roles, and activity article reviews."
          )}
        </p>

        <div className="pt-1">
          <Link
            href="/achievements"
            className="inline-flex items-center text-xs font-mono font-medium text-foreground hover:underline bg-muted/50 hover:bg-muted px-3.5 py-1.5 rounded-lg border border-border/50 transition-colors"
          >
            {t("Lihat Semua Artikel →", "See All Articles →")}
          </Link>
        </div>
      </div>

      {/* Clean Minimal Horizontal List (Exact Format from Reference Image) */}
      <div className="divide-y divide-border/40 w-full border-y border-border/40">
        {ACHIEVEMENTS.map((item, idx) => {
          const isExternal = Boolean(item.url);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
            >
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-card/40 transition-colors px-2 rounded-lg">
                {/* Left Side: Thumbnail Image + Title, Position Badge & Description */}
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/20">
                        {t(item.positionId, item.positionEn)}
                      </Badge>
                      <span className="text-[11px] font-mono text-muted-foreground">{t(item.periodId, item.periodEn)}</span>
                    </div>

                    <h3 className="text-base sm:text-xl font-bold font-sans tracking-tight text-foreground group-hover:text-primary transition-colors">
                      <Link href={`/achievements/${item.slug}`} className="hover:underline">
                        {t(item.titleId, item.titleEn)}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm font-sans text-muted-foreground line-clamp-2 leading-relaxed">
                      {t(item.descriptionId, item.descriptionEn)}
                    </p>
                  </div>
                </div>

                {/* Right Side: Stack Tags & Action Button */}
                <div className="flex md:flex-col md:items-end justify-between sm:justify-start gap-2 shrink-0 text-left md:text-right">
                  <span className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    {item.tags.slice(0, 3).join(" • ")}
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
                        <span>Official Link</span>
                        <ExternalLink className="size-3" />
                      </a>
                    )}

                    <Link
                      href={`/achievements/${item.slug}`}
                      className="text-xs font-sans font-semibold text-foreground group-hover:text-primary hover:underline flex items-center gap-1"
                    >
                      <span>{t("Baca Artikel →", "Read Article →")}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
