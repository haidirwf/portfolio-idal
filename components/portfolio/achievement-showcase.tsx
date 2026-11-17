"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { useLanguage } from "@/components/language-provider";

export function AchievementShowcase() {
  const { t } = useLanguage();
  const [isHoveringList, setIsHoveringList] = React.useState(false);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  const displayAchievements = ACHIEVEMENTS.slice(0, 3);

  const markSourceHome = () => {
    try {
      sessionStorage.setItem("article_source", "home");
    } catch {
      // ignore
    }
  };

  return (
    <section id="articles" className="py-8 sm:py-10 space-y-5 scroll-mt-16">
      {/* Head */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-primary font-semibold">02</span>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
            {t("Pengalaman & Prestasi", "Experience & Milestones")}
          </h2>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <span>{t("Semua catatan", "All milestones")}</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* Ordered List with Sibling Dim Effect */}
      <ol
        className="border-t border-border"
        onMouseEnter={() => setIsHoveringList(true)}
        onMouseLeave={() => {
          setIsHoveringList(false);
          setHoveredIdx(null);
        }}
      >
        {displayAchievements.map((item, idx) => {
          const isDimmed = isHoveringList && hoveredIdx !== null && hoveredIdx !== idx;

          return (
            <li
              key={item.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={`py-4 border-b border-border space-y-1 transition-opacity duration-200 ${
                isDimmed ? "opacity-40" : "opacity-100"
              }`}
            >
              {/* Row 1: Title + Badge + Date */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/articles/${item.slug}`}
                    onClick={markSourceHome}
                    className="font-medium text-sm sm:text-[15px] text-foreground hover:underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                  >
                    {t(item.titleId, item.titleEn)}
                  </Link>

                  {idx === 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary font-semibold">
                      {t("Terbaru", "Latest")}
                    </span>
                  )}
                </div>

                <span className="font-mono text-xs text-muted-foreground shrink-0">
                  {item.periodEn}
                </span>
              </div>

              {/* Row 2: Role / Organization */}
              <p className="text-xs text-muted-foreground">
                {t(item.positionId, item.positionEn)} · {item.organization}
              </p>

              {/* Row 3: Description */}
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-muted-foreground pt-1 max-w-2xl">
                {t(item.descriptionId, item.descriptionEn)}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
