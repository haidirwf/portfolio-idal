"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { useLanguage } from "@/components/language-provider";

export function WritingSection() {
  const { t } = useLanguage();
  const [isHoveringList, setIsHoveringList] = React.useState(false);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  const posts = ACHIEVEMENTS.slice(0, 3);

  const markSourceHome = () => {
    try {
      sessionStorage.setItem("article_source", "home");
    } catch {
      // ignore
    }
  };

  return (
    <section className="py-8 sm:py-10 space-y-5">
      {/* Head */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-primary font-semibold">04</span>
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
            {t("Artikel & Tulisan", "Writing")}
          </h2>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <span>{t("Semua tulisan", "All writing")}</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* Posts List */}
      <div
        className="border-t border-border"
        onMouseEnter={() => setIsHoveringList(true)}
        onMouseLeave={() => {
          setIsHoveringList(false);
          setHoveredIdx(null);
        }}
      >
        {posts.map((post, idx) => {
          const isDimmed = isHoveringList && hoveredIdx !== null && hoveredIdx !== idx;

          return (
            <Link
              key={post.slug}
              href={`/articles/${post.slug}`}
              onClick={markSourceHome}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={`flex items-baseline justify-between gap-4 py-3.5 border-b border-border group transition-opacity duration-200 ${
                isDimmed ? "opacity-40" : "opacity-100"
              }`}
            >
              <h3 className="text-sm font-medium text-foreground group-hover:underline underline-offset-4 decoration-border group-hover:decoration-foreground transition-colors truncate">
                {t(post.titleId, post.titleEn)}
              </h3>
              <time className="font-mono text-xs text-muted-foreground shrink-0">
                {post.periodEn}
              </time>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
