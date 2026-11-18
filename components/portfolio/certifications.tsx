"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface Certificate {
  code: string;
  name: string;
  issuer: string;
  id: string;
  period: string;
  url: string;
  image?: string;
  descriptionId: string;
  descriptionEn: string;
}

const CERTIFICATIONS: Certificate[] = [
  {
    code: "MTCNA",
    name: "MikroTik Certified Network Associate",
    issuer: "MikroTik",
    id: "2601NA9959",
    period: "2026 – 2029",
    url: "https://mikrotik.com/training/certificates/c699959c362cafd8fede",
    image: "/certificates/MTCNA.webp",
    descriptionId:
      "Dasar konfigurasi RouterOS: bridging, routing statis, manajemen bandwidth (Simple Queue), firewall packet filtering & NAT, DHCP server/client, serta konfigurasi wireless.",
    descriptionEn:
      "RouterOS fundamentals: bridging, static routing, bandwidth management (Simple Queue), firewall packet filtering & NAT, DHCP server/client, and wireless configuration.",
  },
  {
    code: "MTCRE",
    name: "MikroTik Certified Routing Engineer",
    issuer: "MikroTik",
    id: "2601RE9976",
    period: "2026 – 2029",
    url: "https://mikrotik.com/training/certificates/c699976c6108324c354d",
    descriptionId:
      "Rekayasa routing tingkat lanjut: static routing berhirarki dengan multiple gateway & recursive routes, multi-area OSPF, route redistribution & routing filters, serta VPN point-to-point (IPIP, EoIP, GRE, PPTP/L2TP, VLAN).",
    descriptionEn:
      "Advanced routing engineering: hierarchical static routing with multiple gateways & recursive routes, multi-area OSPF, route redistribution & routing filters, and point-to-point VPN tunnels (IPIP, EoIP, GRE, PPTP/L2TP, VLAN).",
  },
];

export function Certifications() {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = React.useState<Certificate | null>(null);
  const [isHoveringList, setIsHoveringList] = React.useState(false);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Handle ESC key for lightbox
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

      {/* Editorial List with Sibling Dim Effect */}
      <ul
        className="border-t border-border"
        onMouseEnter={() => setIsHoveringList(true)}
        onMouseLeave={() => {
          setIsHoveringList(false);
          setHoveredIdx(null);
        }}
      >
        {CERTIFICATIONS.map((cert, idx) => {
          const isDimmed = isHoveringList && hoveredIdx !== null && hoveredIdx !== idx;

          return (
            <li
              key={cert.code}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={`py-4 border-b border-border space-y-2 transition-opacity duration-200 ${
                isDimmed ? "opacity-40" : "opacity-100"
              }`}
            >
              {/* Row 1: Code Badge + Title + Period */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                  <span className="px-1.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-secondary/80 border border-border text-foreground font-semibold">
                    {cert.code}
                  </span>
                  <span className="font-medium text-sm sm:text-[15px] text-foreground">
                    {cert.name}
                  </span>
                </div>

                <span className="font-mono text-xs text-muted-foreground shrink-0">
                  {cert.period}
                </span>
              </div>

              {/* Row 2: Issuer & ID + Actions */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-0.5">
                <p className="font-mono text-xs text-muted-foreground">
                  {cert.issuer} · Certificate ID: {cert.id}
                </p>

                <div className="flex items-center gap-3.5 text-xs font-mono">
                  {cert.image && (
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <span>{t("Lihat salinan", "View copy")}</span>
                      <ExternalLink className="size-3" />
                    </button>
                  )}

                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-foreground hover:underline underline-offset-4 transition-colors font-medium"
                  >
                    <span>{t("Verifikasi resmi", "Verify credential")}</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>

              {/* Row 3: Competencies / Description */}
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-muted-foreground max-w-2xl">
                {t(cert.descriptionId, cert.descriptionEn)}
              </p>
            </li>
          );
        })}
      </ul>

      {/* Lightbox Modal */}
      {selectedCert && selectedCert.image && typeof document !== "undefined" && createPortal(
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 w-screen h-screen z-[9999] bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6 cursor-zoom-out animate-in fade-in duration-150"
          style={{ margin: 0, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Top Bar with Title & Close Button */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl flex items-center justify-between pb-3 text-white cursor-default"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold text-xs px-2 py-0.5 rounded bg-white/10 text-white">
                {selectedCert.code}
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-200">
                {selectedCert.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl h-[65vh] sm:h-[75vh] flex items-center justify-center rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black/60 cursor-default"
          >
            <Image
              src={selectedCert.image}
              alt={`${selectedCert.code} - ${selectedCert.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain select-none"
              quality={95}
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
