"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAchievementBySlug } from "@/lib/achievements";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";
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
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="font-mono text-xs bg-primary/10 text-primary border-primary/20">
            {t(item.positionId, item.positionEn)}
          </Badge>
          <span className="text-xs font-mono text-muted-foreground">{t(item.periodId, item.periodEn)}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight leading-tight">
          {t(item.titleId, item.titleEn)}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-muted-foreground border-y border-border/40 py-3">
          <div className="flex items-center gap-1.5">
            <Award className="size-4 text-primary shrink-0" />
            <span>{item.organization}</span>
          </div>
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

      {/* Article Highlights */}
      <Card className="p-5 border-border/80 bg-card/60 rounded-xl space-y-3">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground">
          {t("Sorotan & Kontribusi Utama", "Key Highlights & Contributions")}
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(lang === "ID" ? item.highlightsId : item.highlightsEn).map((hl, idx) => (
            <li key={idx} className="text-xs font-sans text-muted-foreground flex items-start gap-2">
              <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
              <span>{hl}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Main Article Body */}
      <div className="prose dark:prose-invert max-w-none text-muted-foreground font-sans text-sm leading-relaxed space-y-4 whitespace-pre-line pt-2">
        {articleText}
      </div>

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
