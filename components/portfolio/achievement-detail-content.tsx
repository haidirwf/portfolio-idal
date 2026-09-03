"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAchievementBySlug } from "@/lib/achievements";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink, Calendar, MapPin } from "lucide-react";
import { useExternalLinkConfirm } from "@/components/portfolio/external-link-modal";

export function AchievementDetailContent({ slug }: { slug: string }) {
  const item = getAchievementBySlug(slug);
  const { t, lang } = useLanguage();
  const { openConfirmation } = useExternalLinkConfirm();

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold font-sans">{t("Artikel tidak ditemukan", "Article not found")}</h1>
        <p className="text-sm text-muted-foreground font-sans">
          {t("Halaman artikel kegiatan ini tidak dapat ditemukan.", "The requested activity article page does not exist.")}
        </p>
        <Link href="/" className={cn(buttonVariants({ variant: "default" }), "font-sans text-xs")}>
          {t("Kembali ke Beranda", "Back to Home")}
        </Link>
      </div>
    );
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, title: string) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      openConfirmation(url, title);
    }
  };

  const articleText = lang === "ID" ? item.articleContentId : item.articleContentEn;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "font-mono text-xs gap-2")}
        >
          <ArrowLeft className="size-3.5" />
          <span>{t("Kembali", "Back")}</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono text-muted-foreground">{t(item.periodId, item.periodEn)}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight leading-tight">
          {t(item.titleId, item.titleEn)}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-muted-foreground border-y border-border/40 py-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 text-primary shrink-0" />
            <span>{t(item.locationId, item.locationEn)}</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-video rounded-xl overflow-hidden border border-border/60 bg-secondary/30 shadow-sm">
        <Image
          src={item.cover}
          alt={t(item.titleId, item.titleEn)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
          className="object-contain p-2"
          priority
        />
      </div>

      {/* Main Article Body (Formatted Markdown with headings and lists) */}
      <Card className="p-6 sm:p-8 border-border/80 bg-card/60 rounded-xl space-y-6">
        <div className="text-muted-foreground font-sans text-sm leading-relaxed space-y-5">
          {(() => {
            const content = (articleText || "").trim();
            const sections = content.split(/\n(?=### )/);

            const renderFormattedText = (raw: string) => {
              const tokens = raw.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
              return tokens.map((token, tIdx) => {
                if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
                  return (
                    <strong key={tIdx} className="font-semibold text-foreground">
                      {token.slice(2, -2)}
                    </strong>
                  );
                }
                if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
                  return (
                    <code key={tIdx} className="px-1.5 py-0.5 rounded-sm bg-muted text-foreground font-mono text-[11px]">
                      {token.slice(1, -1)}
                    </code>
                  );
                }
                if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
                  return (
                    <em key={tIdx} className="italic text-foreground/90">
                      {token.slice(1, -1)}
                    </em>
                  );
                }
                return <React.Fragment key={tIdx}>{token}</React.Fragment>;
              });
            };

            return sections.map((sec, idx) => {
              const lines = sec.trim().split("\n");
              const headingLine = lines[0].startsWith("### ") ? lines[0].replace(/^###\s+/, "") : null;
              const bodyLines = headingLine ? lines.slice(1) : lines;

              return (
                <div key={idx} className="space-y-3 pt-1">
                  {headingLine && (
                    <h3 className="text-base sm:text-lg font-bold font-sans text-foreground flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary inline-block" />
                      {headingLine}
                    </h3>
                  )}

                  <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                    {bodyLines.map((line, lIdx) => {
                      const cleanLine = line.trim();
                      if (!cleanLine) return null;

                      if (cleanLine.startsWith("#### ")) {
                        return (
                          <h4 key={lIdx} className="text-xs sm:text-sm font-bold font-sans text-foreground pt-3">
                            {renderFormattedText(cleanLine.replace("#### ", ""))}
                          </h4>
                        );
                      }
                      if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
                        return (
                          <div key={lIdx} className="flex items-start gap-2 pl-2">
                            <span className="text-primary mt-0.5 font-bold">•</span>
                            <span className="leading-relaxed">{renderFormattedText(cleanLine.slice(2))}</span>
                          </div>
                        );
                      }
                      if (/^\d+\.\s/.test(cleanLine)) {
                        return (
                          <div key={lIdx} className="flex items-start gap-2 pl-2">
                            <span className="font-mono text-primary font-bold">{cleanLine.match(/^\d+\./)?.[0]}</span>
                            <span className="leading-relaxed">{renderFormattedText(cleanLine.replace(/^\d+\.\s+/, ""))}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={lIdx} className="leading-relaxed">
                          {renderFormattedText(cleanLine)}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </Card>

      {/* External Link Action */}
      {item.url && (
        <div className="pt-6 border-t border-border/40 flex items-center justify-between">
          <span className="text-xs font-sans text-muted-foreground">
            {t("Tautan resmi terkait kegiatan / organisasi:", "Official link related to activity / organization:")}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleLinkClick(e, item.url!, item.organization)}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-mono text-xs gap-1.5")}
          >
            <span>Visit Website</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
