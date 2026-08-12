"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { ExternalLink, Award, Trophy } from "lucide-react";
import { useExternalLinkConfirm } from "@/components/portfolio/external-link-modal";

export interface Achievement {
  id: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  cover: string;
  year: string;
  tags: string[];
  url?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "netadmin-lks",
    titleId: "Finalis & Peserta Lomba Network Administrator",
    titleEn: "Network Administrator Competition Finalist",
    descriptionId: "Berpartisipasi aktif dalam ajang kompetisi administrasi jaringan komputer, mendesain routing OSPF/EIGRP dinamis, konfigurasi firewall MikroTik, dan troubleshooting topologi enterprise.",
    descriptionEn: "Actively competed in computer network administration contests, designing dynamic OSPF/EIGRP routing, MikroTik firewall configurations, and troubleshooting complex enterprise topologies.",
    cover: "/projects/enterprise.webp",
    year: "2026",
    tags: ["Network Competition", "Cisco Packet Tracer", "MikroTik", "Troubleshooting"],
  },
  {
    id: "media-division-lead",
    titleId: "Divisi Media & Public Relations — OSIS IDN Solo",
    titleEn: "Media Division & Public Relations Lead — IDN Solo",
    descriptionId: "Mengelola branding visual resmi OSIS, publikasi liputan kegiatan sekolah, serta pengarahan tim media dalam dokumentasi event siswa.",
    descriptionEn: "Managed official student council visual branding, event media coverage publications, and directed team members in event documentation.",
    cover: "/experience/issc.webp",
    year: "2026",
    tags: ["Digital Branding", "Public Relations", "Event Management"],
    url: "https://www.linkedin.com/company/idnsolostudentcouncil/"
  },
  {
    id: "founder-luncur",
    titleId: "Pendiri Luncur Tech & IT Consulting",
    titleEn: "Founder of Luncur Tech & IT Consulting",
    descriptionId: "Inisiatif membangun layanan perancangan arsitektur jaringan, konsultasi IT, dan pengembangan infrastruktur digital terpadu.",
    descriptionEn: "Initiative in building network architecture consulting, IT services, and integrated digital infrastructure engineering.",
    cover: "/experience/luncur.webp",
    year: "2026",
    tags: ["IT Consulting", "Infrastructure", "Leadership"],
    url: "https://luncur.site/"
  }
];

export function AchievementShowcase() {
  const { t } = useLanguage();
  const { openConfirmation } = useExternalLinkConfirm();
  const [tooltip, setTooltip] = React.useState<{ show: boolean; x: number; y: number; text: string }>({
    show: false,
    x: 0,
    y: 0,
    text: "",
  });

  const handleMouseMove = (e: React.MouseEvent, title: string) => {
    setTooltip({
      show: true,
      x: e.clientX + 12,
      y: e.clientY + 12,
      text: `${title} — Open in new tab ↗`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, title: string) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      openConfirmation(url, title);
    }
  };

  return (
    <section id="achievements" className="py-12 px-6 sm:px-10 space-y-6 relative">
      {/* Floating Mouse Tooltip for Desktop */}
      <AnimatePresence>
        {tooltip.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{ left: tooltip.x, top: tooltip.y }}
            className="fixed z-50 pointer-events-none hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background font-mono text-[11px] font-semibold shadow-lg border border-background/20"
          >
            <span>{tooltip.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Pencapaian & Kegiatan", "Achievements & Activities")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          {t(
            "Rekam jejak kompetisi jaringan, kepemimpinan organisasi, serta kontribusi proyek teknologi.",
            "Network competition milestones, organization leadership, and tech project contributions."
          )}
        </p>
      </div>

      {/* Vertical Card List (Card Style Copy of Project Showcase, Formatted Vertically) */}
      <div className="flex flex-col gap-5 w-full">
        {ACHIEVEMENTS.map((item, idx) => {
          const isExternal = Boolean(item.url);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="w-full"
            >
              <Card className="w-full flex flex-col justify-between overflow-hidden border-border/80 bg-card/60 rounded-xl p-2.5 hover:bg-card hover:shadow-md transition-all duration-300 group">
                <div className="space-y-3">
                  <div className="relative aspect-video w-full max-h-[320px] rounded-lg bg-secondary/40 overflow-hidden border border-border/40">
                    <Image
                      src={item.cover}
                      alt={t(item.titleId, item.titleEn)}
                      fill
                      sizes="100vw"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  <div className="px-3 pt-1 space-y-1.5">
                    <CardTitle className="text-base sm:text-lg font-bold font-sans tracking-tight">
                      {isExternal ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => handleLinkClick(e, item.url!, t(item.titleId, item.titleEn))}
                          onMouseMove={(e) => handleMouseMove(e, t(item.titleId, item.titleEn))}
                          onMouseLeave={handleMouseLeave}
                          className="hover:underline group-hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                          <span>{t(item.titleId, item.titleEn)}</span>
                          <ExternalLink className="size-3.5 text-primary shrink-0" />
                        </a>
                      ) : (
                        <span className="group-hover:text-primary transition-colors">
                          {t(item.titleId, item.titleEn)}
                        </span>
                      )}
                    </CardTitle>

                    <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t(item.descriptionId, item.descriptionEn)}
                    </CardDescription>
                  </div>
                </div>

                <div className="p-3 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/40">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/80 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-muted-foreground shrink-0">
                      {item.year}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
