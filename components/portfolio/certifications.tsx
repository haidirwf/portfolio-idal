"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ExternalLink, Award } from "lucide-react";
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
    url: "https://mikrotik.com/training/certificates/c699976c6108324c354d",
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
  const [selectedCert, setSelectedCert] = React.useState<Certificate | null>(null);

  // Handle ESC key for fullscreen lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };

    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

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
              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="text-foreground hover:underline cursor-pointer"
              >
                {t("Lihat sertifikat", "View certificate")}
              </button>

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

      {/* Fullscreen Certificate Image Lightbox Modal */}
      {selectedCert && typeof document !== "undefined" && createPortal(
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 w-screen h-screen z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
          style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Top Bar with Title & Close Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl flex items-center justify-between pb-3 text-white cursor-default"
          >
            <span className="text-sm font-semibold">
              {selectedCert.code} — {selectedCert.name}
            </span>

            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Certificate Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-[70vh] sm:h-[80vh] flex items-center justify-center rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 cursor-default"
          >
            <Image
              src={selectedCert.image}
              alt={`${selectedCert.code} - ${selectedCert.name}`}
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
    </section>
  );
}
