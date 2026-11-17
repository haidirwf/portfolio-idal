"use client";

import * as React from "react";
import { ArrowUpRight, Copy, Check, ArrowUp } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();
  const [copied, setCopied] = React.useState(false);
  const email = "raufidnn@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="px-4 sm:px-10 pt-10 sm:pt-14 pb-8 sm:pb-10 border-t border-border scroll-mt-16"
      aria-label="Contact"
    >
      {/* Index & Heading Group */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-primary font-semibold">07</span>
          <span className="text-muted-foreground/30 text-xs select-none">/</span>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold m-0">
            {t("Kontak", "Contact")}
          </p>
        </div>

        <h2 className="text-2xl sm:text-[30px] font-semibold tracking-tight text-foreground leading-tight m-0">
          {t("Mari berkolaborasi.", "Let’s work together.")}
        </h2>
      </div>

      {/* Subtitles / Bio & Location */}
      <div className="mt-3.5 space-y-1.5 text-sm sm:text-[14.5px] text-muted-foreground leading-relaxed max-w-xl">
        <p className="m-0">
          {t(
            "Terbuka untuk kesempatan magang (PKL), proyek infrastruktur jaringan, dan kolaborasi teknis.",
            "Open to internship (PKL) opportunities, network infrastructure projects, and collaborations."
          )}
        </p>
        <p className="font-mono text-xs text-muted-foreground/80 pt-0.5 m-0">
          {t("Berbasis di Bekasi, Indonesia (WIB · UTC+7)", "Based in Bekasi, Indonesia (UTC+7)")}
        </p>
      </div>

      {/* Action Links */}
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-medium">
        {/* Email group with subtle copy button */}
        <div className="inline-flex items-center gap-1.5">
          <a
            href={`mailto:${email}`}
            className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            {t("Kirim Email", "Email me")}
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-grid place-items-center size-6 rounded text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
            aria-label="Copy email address"
            title={copied ? "Copied!" : "Copy email address"}
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-500 animate-in zoom-in-75 duration-150" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>

        <span className="text-muted-foreground/30 font-mono text-xs select-none">·</span>

        {/* WhatsApp Link */}
        <a
          href="https://wa.me/6282173662010"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          <span>{t("Hubungi via WhatsApp", "Chat on WhatsApp")}</span>
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      {/* Footer Nav Links */}
      <nav
        className="mt-10 sm:mt-12 pt-5 border-t border-dashed border-border flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
        aria-label="Footer links"
      >
        <a
          href="https://github.com/haidirwf"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/haidar-rauf/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://instagram.com/haidarwf"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Instagram
        </a>
        <button
          type="button"
          onClick={scrollToTop}
          className="ml-auto inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <span>{t("Kembali ke atas", "Back to top")}</span>
          <ArrowUp className="size-3" />
        </button>
      </nav>

      {/* Colophon & Meta */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
        <p className="m-0">
          {t("Dirancang dan dibangun oleh Haidar.", "Designed and built by Haidar.")}
        </p>

        <div className="flex items-center gap-3">
          <span>Open for work</span>
          <span>·</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
