"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface Certificate {
  code: string;
  name: string;
  id: string;
  period: string;
  image: string;
  url: string;
}

const CERTIFICATIONS: Certificate[] = [
  {
    code: "MTCNA",
    name: "MikroTik Certified Network Associate",
    id: "2601NA9959",
    period: "2026 – 2029",
    image: "/certificates/MTCNA.webp",
    url: "https://mikrotik.com/training/certificates/c699959c362cafd8fede",
  },
  {
    code: "MTCRE",
    name: "MikroTik Certified Routing Engineer",
    id: "2601RE9976",
    period: "2026 – 2029",
    image: "/certificates/MTCNA.webp",
    url: "https://mikrotik.com/training/certificates/c699976c6108324c354d",
  },
];

export function Certifications() {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="py-8 sm:py-10 space-y-5 scroll-mt-16">
      {/* Head */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-primary font-semibold">06</span>
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
          {t("Sertifikasi Industri", "Certifications")}
        </h2>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.code}
            className="p-4 rounded-xl border border-border bg-card/40 hover:bg-card hover:border-border transition-colors flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-foreground">
                  {cert.code}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {cert.period}
                </span>
              </div>

              <h3 className="text-xs sm:text-[13px] font-medium text-foreground leading-snug">
                {cert.name}
              </h3>

              <p className="font-mono text-[11px] text-muted-foreground">
                Certificate ID: {cert.id}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-border/50 text-xs font-mono">
              <a
                href={cert.image}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-foreground hover:underline"
              >
                <span>{t("Lihat sertifikat", "View certificate")}</span>
                <ExternalLink className="size-3" />
              </a>

              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Verifikasi</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
