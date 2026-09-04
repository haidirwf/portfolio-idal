"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  ExternalLink,
  ShieldCheck,
  Eye,
  X,
  Calendar,
  Hash
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { useExternalLinkConfirm } from "@/components/portfolio/external-link-modal";

interface Certificate {
  code: string;
  name: string;
  issuer: "MikroTik" | "Cisco";
  id: string;
  period: string;
  url: string;
  image: string;
  skills: string[];
  themeColor: string;
}

const CERTIFICATIONS: Certificate[] = [
  {
    code: "MTCNA",
    name: "MikroTik Certified Network Associate",
    issuer: "MikroTik",
    id: "2601NA9959",
    period: "2026 – 2029",
    url: "https://mikrotik.com/training/certificates/c699976c6108324c354d",
    image: "/certificates/mtcna.webp",
    skills: ["RouterOS", "Static Routing", "Bridging", "Firewall NAT", "Wireless", "Tunnels"],
    themeColor: "from-red-500/20 to-orange-500/10 border-red-500/30 text-red-500"
  },
  {
    code: "MTCRE",
    name: "MikroTik Certified Routing Engineer",
    issuer: "MikroTik",
    id: "2601RE9976",
    period: "2026 – 2029",
    url: "https://mikrotik.com/training/certificates/c699976c6108324c354d",
    image: "/certificates/mtcre.webp",
    skills: ["Static Routing", "Point-to-Point VPN", "OSPF Areas & States", "Route Redistribution"],
    themeColor: "from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-500"
  },
  {
    code: "CCNA",
    name: "Cisco Certified Network Associate",
    issuer: "Cisco",
    id: "CSCO-2026-VERIFIED",
    period: "2026 – 2029",
    url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
    image: "/certificates/ccna.webp",
    skills: ["Network Fundamentals", "IP Connectivity", "IP Services", "Security Fundamentals"],
    themeColor: "from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-500"
  }
];

export function Certifications() {
  const { t } = useLanguage();
  const { openConfirmation } = useExternalLinkConfirm();
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, title: string) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      openConfirmation(url, title);
    }
  };

  return (
    <section id="certifications" className="py-12 px-4 sm:px-6 space-y-8 relative scroll-mt-20">
      {/* Header Section */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Sertifikasi Resmi", "Official Certifications")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Sertifikasi kompetensi jaringan standar industri yang diakui secara global dari MikroTik dan Cisco Systems.",
            "Globally recognized industry-standard networking certifications from MikroTik and Cisco Systems."
          )}
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={cert.code}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: idx * 0.08 }}
            className="h-full"
          >
            <Card className="h-full border-border/80 bg-card/60 rounded-xl overflow-hidden shadow-xs hover:border-primary/50 hover:bg-card/90 hover:shadow-lg transition-all duration-300 flex flex-col group">
              {/* Image Preview with Interactive Lightbox Trigger */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative aspect-[16/10] w-full bg-secondary/30 overflow-hidden cursor-pointer select-none border-b border-border/60"
              >
                <Image
                  src={cert.image}
                  alt={`${cert.code} - ${cert.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-sans text-xs font-semibold backdrop-blur-[2px]">
                  <Eye className="size-4" />
                  <span>{t("Lihat Sertifikat", "View Certificate")}</span>
                </div>

                {/* Issuer Badge on Image Top-Left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-background/80 border border-border/60 text-foreground shadow-xs">
                    {cert.issuer}
                  </span>
                </div>

                {/* Verified Pill Top-Right */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 backdrop-blur-md">
                    <ShieldCheck className="size-3" />
                    <span>{t("Terverifikasi", "Verified")}</span>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold font-sans tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {cert.code}
                    </h3>
                    <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span>{cert.period}</span>
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground font-sans font-medium leading-relaxed">
                    {cert.name}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/40 border border-border/50 text-[11px] font-mono text-muted-foreground">
                    <Hash className="size-3 text-primary/70 shrink-0" />
                    <span className="truncate">ID: {cert.id}</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[10px] font-sans font-medium px-2 py-0.5 bg-secondary/40 text-muted-foreground border-border/40"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-1"
                    >
                      <Eye className="size-3.5" />
                      <span>{t("Perbesar Foto", "Preview")}</span>
                    </button>

                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => handleLinkClick(e, cert.url, `${cert.code} - ${cert.name}`)}
                      title={`${cert.code} Official Verification`}
                      className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-primary hover:underline group/link"
                    >
                      <span>{t("Verifikasi", "Verify")}</span>
                      <ExternalLink className="size-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
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
            className="w-full max-w-5xl flex items-center justify-between pb-3 text-white cursor-default"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold font-sans">
                  {selectedCert.code} — {selectedCert.name}
                </span>
                <span className="hidden sm:inline-block text-xs font-mono text-white/70">
                  (ID: {selectedCert.id})
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans">
                {t("Klik di mana saja atau tekan ESC untuk menutup", "Click anywhere or press ESC to close")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={selectedCert.url}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <span>{t("Verifikasi Resmi", "Verify Official")}</span>
                <ExternalLink className="size-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Certificate Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex items-center justify-center rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 cursor-default"
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
