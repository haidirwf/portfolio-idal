"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface Certificate {
  code: string;
  name: string;
  issuer: string;
  id: string;
  period: string;
  url: string;
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
  const [isHoveringList, setIsHoveringList] = React.useState(false);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

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

              {/* Row 2: Issuer & ID + Action */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-0.5">
                <p className="font-mono text-xs text-muted-foreground">
                  {cert.issuer} · Certificate ID: {cert.id}
                </p>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:underline underline-offset-4 transition-colors font-medium"
                >
                  <span>{t("Verifikasi resmi", "Verify credential")}</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </div>

              {/* Row 3: Competencies / Description */}
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-muted-foreground max-w-2xl">
                {t(cert.descriptionId, cert.descriptionEn)}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
