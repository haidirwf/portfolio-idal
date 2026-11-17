"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { useLanguage } from "@/components/language-provider";

export function AllAchievementsContent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

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

  const markSourceArticles = () => {
    try {
      sessionStorage.setItem("article_source", "articles");
    } catch {
      // ignore
    }
  };

  return (
    <div className="py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>{t("Kembali ke Beranda", "Back to Home")}</span>
        </Link>
      </div>

      {/* Page Intro (matching sumit-pfp pageIntro) */}
      <header className="space-y-2 border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-wider text-primary font-semibold m-0">
          {t("Catatan & Tulisan", "Writing")}
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground m-0">
          {t("Catatan Pengalaman & Kompetisi", "Notes & Experiences")}
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl leading-relaxed m-0">
          {t(
            "Dokumentasi seputar kompetisi hackathon, kejuaraan, serta perjalanan teknis di bidang jaringan komputer.",
            "Documentation chronicling hackathon competitions, championships, and computer networking journey."
          )}
        </p>
      </header>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("Cari artikel...", "Search articles...")}
          className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-lg bg-secondary/40 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Clean Writing List (matching sumit-pfp writingList) */}
      <div className="border-t border-border">
        {filteredAchievements.map((item, idx) => {
          const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;

          return (
            <Link
              key={item.id}
              href={`/articles/${item.slug}`}
              onClick={markSourceArticles}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`block py-5 border-b border-border space-y-1.5 group transition-opacity duration-200 ${
                isDimmed ? "opacity-40" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <time>{item.periodEn}</time>
                <span>·</span>
                <span>{item.organization}</span>
              </div>

              <h2 className="text-base sm:text-lg font-semibold text-foreground group-hover:underline underline-offset-4 decoration-border group-hover:decoration-foreground transition-colors m-0">
                {t(item.titleId, item.titleEn)}
              </h2>

              <p className="text-xs sm:text-[13.5px] text-muted-foreground leading-relaxed max-w-2xl m-0 line-clamp-2">
                {t(item.descriptionId, item.descriptionEn)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
