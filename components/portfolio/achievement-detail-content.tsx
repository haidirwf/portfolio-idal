"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAchievementBySlug } from "@/lib/achievements";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink, Calendar, MapPin, User } from "lucide-react";
import { useExternalLinkConfirm } from "@/components/portfolio/external-link-modal";

export function AchievementDetailContent({ slug }: { slug: string }) {
  const item = getAchievementBySlug(slug);
  const { t, lang } = useLanguage();
  const router = useRouter();
  const { openConfirmation } = useExternalLinkConfirm();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [source, setSource] = React.useState<"home" | "articles">("home");
  const [mounted, setMounted] = React.useState(false);
  const galleryRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = sessionStorage.getItem("article_source");
      if (stored === "home" || stored === "articles") {
        setSource(stored);
        return;
      }
    } catch {
      // ignore
    }

    if (typeof document !== "undefined" && document.referrer) {
      if (document.referrer.includes("/articles")) {
        setSource("articles");
      } else if (document.referrer.startsWith(window.location.origin)) {
        setSource("home");
      }
    }
  }, []);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const hasHistory = window.history.length > 1;
      const isInternal = document.referrer && document.referrer.startsWith(window.location.origin);
      if (hasHistory && (isInternal || sessionStorage.getItem("article_source"))) {
        router.back();
        return;
      }
    }
    router.push(source === "articles" ? "/articles" : "/#articles");
  };

  const backHref = source === "articles" ? "/articles" : "/#articles";

  const handleGalleryScroll = () => {
    if (!galleryRef.current) return;
    const { scrollLeft, clientWidth } = galleryRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / (clientWidth * 0.86));
      setActiveSlide(Math.min(Math.max(index, 0), (item?.gallery?.length || 1) - 1));
    }
  };

  const scrollToSlide = (index: number) => {
    if (!galleryRef.current) return;
    const child = galleryRef.current.children[index] as HTMLElement;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveSlide(index);
    }
  };

  // Handle ESC key to close lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedImage(null);
    };

    if (expandedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedImage]);

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
    <div className="py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href={backHref}
          onClick={handleBack}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "font-mono text-xs gap-2")}
        >
          <ArrowLeft className="size-3.5" />
          <span>
            {mounted
              ? source === "articles"
                ? t("Kembali ke Artikel", "Back to Articles")
                : t("Kembali ke Beranda", "Back to Home")
              : t("Kembali", "Back")}
          </span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight leading-tight">
          {t(item.titleId, item.titleEn)}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-muted-foreground border-y border-border/40 py-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 text-primary shrink-0" />
            <span>{t(item.locationId, item.locationEn)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 text-primary shrink-0" />
            <span>{t(item.periodId, item.periodEn)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <User className="size-4 text-primary shrink-0" />
            <span>Haidar Rauf</span>
          </div>
        </div>
      </div>

      {/* Cover Image / Documentation Gallery */}
      {item.gallery && item.gallery.length > 1 ? (() => {
        const gallery = item.gallery;
        return (
          <div className="space-y-3">
            <div
              ref={galleryRef}
              onScroll={handleGalleryScroll}
              className="flex sm:grid sm:grid-cols-2 gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 py-1"
            >
              {gallery.map((photo, pIdx) => (
                <div
                  key={pIdx}
                  onClick={() => setExpandedImage(photo)}
                  className="relative shrink-0 w-[86%] sm:w-auto snap-center sm:snap-none aspect-[4/5] sm:aspect-[3/4] rounded-xl overflow-hidden border border-border/60 bg-secondary/30 shadow-xs cursor-pointer select-none group"
                >
                  <Image
                    src={photo}
                    alt={`${t(item.titleId, item.titleEn)} - Dokumentasi ${pIdx + 1}`}
                    fill
                    sizes="(max-width: 640px) 86vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={pIdx === 0}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-sans font-medium backdrop-blur-[2px]">
                    {t("Klik untuk perbesar", "Click to expand")}
                  </div>
                  {/* Mobile Photo Counter Badge */}
                  <div className="absolute top-2.5 right-2.5 sm:hidden px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-mono font-medium text-white border border-white/20">
                    {pIdx + 1} / {gallery.length}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Pagination Dots */}
            <div className="flex sm:hidden justify-center items-center gap-1.5 pt-1">
              {gallery.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToSlide(dotIdx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    activeSlide === dotIdx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                  )}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        );
      })() : (
        <div
          onClick={() => setExpandedImage(item.cover)}
          className="relative aspect-video rounded-xl overflow-hidden border border-border/60 bg-secondary/30 shadow-sm cursor-pointer select-none group"
        >
          <Image
            src={item.cover}
            alt={t(item.titleId, item.titleEn)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.01]"
            priority
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-sans font-medium backdrop-blur-[2px]">
            {t("Klik untuk perbesar", "Click to expand")}
          </div>
        </div>
      )}

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
                    <h3 className="text-base sm:text-lg font-bold font-sans text-foreground">
                      {headingLine}
                    </h3>
                  )}

                  <div className="space-y-4 text-sm sm:text-base text-muted-foreground text-justify">
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
                        <p key={lIdx} className="leading-relaxed text-justify">
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

      {/* Fullscreen Lightbox Modal */}
      {expandedImage && typeof document !== "undefined" && createPortal(
        <div
          onClick={() => setExpandedImage(null)}
          className="fixed inset-0 w-screen h-screen z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
          style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl flex items-center justify-between pb-3 text-white cursor-default"
          >
            <span className="text-xs sm:text-sm font-sans font-medium text-white/80">
              {t(item.titleId, item.titleEn)}
            </span>
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-[75vh] sm:h-[85vh] flex items-center justify-center rounded-xl overflow-hidden cursor-default"
          >
            <Image
              src={expandedImage}
              alt="Dokumentasi Fullscreen"
              fill
              sizes="100vw"
              className="object-contain select-none"
              quality={100}
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
