"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { ExternalLink, Award, GraduationCap, ShieldCheck } from "lucide-react";
import { useExternalLinkConfirm } from "@/components/portfolio/external-link-modal";

export function About() {
  const { t } = useLanguage();
  const { openConfirmation } = useExternalLinkConfirm();

  const certifications = [
    {
      code: "MTCNA",
      name: "MikroTik Certified Network Associate",
      id: "2601NA9959",
      period: "2026 – 2029",
      url: "https://mikrotik.com/training/certificates/c699976c6108324c354d"
    },
    {
      code: "MTCRE",
      name: "MikroTik Certified Routing Engineer",
      id: "2601RE9976",
      period: "2026 – 2029",
      url: "https://mikrotik.com/training/certificates/c699976c6108324c354d"
    }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string, title: string) => {
    // Only intercept on non-desktop / touch / small screens
    if (window.innerWidth < 1024) {
      e.preventDefault();
      openConfirmation(url, title);
    }
  };

  const education = [
    {
      school: "IDN Boarding School Solo",
      field: t("Teknik Komputer dan Jaringan (TKJ)", "Computer & Network Engineering"),
      period: "2025 – 2028"
    },
    {
      school: "IDN Boarding School",
      field: t("SMP / Middle School", "Middle School"),
      period: "2022 – 2025"
    }
  ];

  return (
    <section id="about" className="py-12 px-4 sm:px-6 space-y-8 relative scroll-mt-20">
      {/* Header Section */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Tentang Saya", "About Me")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Ringkasan profil profesional, sertifikasi industri MikroTik, dan latar belakang akademik.",
            "Professional profile summary, MikroTik industry certifications, and academic background."
          )}
        </p>
      </div>

      {/* Grid 2 Kolom Bersih & Simetris */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Profile Card (Kiri) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <a
            href="https://www.linkedin.com/in/haidar-rauf/"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleLinkClick(e, "https://www.linkedin.com/in/haidar-rauf/", "LinkedIn Profile")}
            className="group block h-full cursor-pointer"
            title="LinkedIn Profile — Open in new tab ↗"
          >
            <Card className="h-full border-border/80 bg-card/60 rounded-xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-primary/50 hover:bg-card/90 hover:shadow-md transition-all duration-300 relative">
              <div className="space-y-4">
                {/* Photo Row */}
                <div className="flex items-start justify-between">
                  <img
                    src="/experience/haidarphoto.webp"
                    alt="Muhammad Haidar Rauf Prayogo"
                    width={144}
                    height={144}
                    decoding="async"
                    loading="lazy"
                    className="w-auto h-28 sm:h-36 object-contain shrink-0"
                  />
                  <ExternalLink className="size-4 text-primary opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <span>Haidar Rauf</span>
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-medium text-muted-foreground">
                    {t(
                      "Network Engineer yang berfokus pada infrastruktur jaringan enterprise yang aman, andal, dan skalabel.",
                      "Network Engineer focused on secure, reliable, and scalable enterprise network infrastructure."
                    )}
                  </p>
                </div>

                <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                  {t(
                    "Spesialisasi mencakup perancangan topologi jaringan komputer, otomatisasi protokol routing dinamis MikroTik & Cisco, pengerasan sistem keamanan firewall, serta implementasi VPN tunnel.",
                    "Specializing in computer network topology design, MikroTik & Cisco dynamic routing protocol automation, firewall security hardening, and VPN tunnel implementations."
                  )}
                </p>
              </div>
            </Card>
          </a>
        </motion.div>

        {/* Certifications & Education Stack (Kanan) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="h-full flex flex-col gap-4"
        >
          {/* Certifications Box */}
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="flex-1">
            <Card className="h-full border-border/80 bg-card/60 rounded-xl p-5 space-y-3 shadow-xs hover:border-primary/40 hover:bg-card/90 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Award className="size-3.5 text-primary" />
                  <span>{t("Sertifikasi", "Certifications")}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {certifications.map((cert) => (
                  <a
                    key={cert.code}
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => handleLinkClick(e, cert.url, cert.code)}
                    title={`${cert.code} — Open in new tab ↗`}
                    className="group block p-2.5 rounded-lg bg-secondary/30 border border-border/40 hover:border-primary/50 hover:bg-secondary/60 transition-all space-y-0.5 cursor-pointer relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold font-sans text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        <span>{cert.code}</span>
                        <ExternalLink className="size-3 text-primary opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">{cert.period}</span>
                    </div>
                    <p className="text-[11px] font-sans text-muted-foreground font-medium leading-tight truncate">{cert.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground/70">ID: {cert.id}</p>
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Education Box */}
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="flex-1">
            <Card className="h-full border-border/80 bg-card/60 rounded-xl p-5 space-y-3 shadow-xs hover:border-primary/40 hover:bg-card/90 hover:shadow-md transition-all duration-300">
              <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <GraduationCap className="size-3.5 text-primary" />
                <span>{t("Pendidikan", "Education")}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-secondary/30 border border-border/40 space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold font-sans text-foreground truncate">{edu.school}</p>
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">{edu.period}</span>
                    </div>
                    <p className="text-[11px] font-sans text-muted-foreground truncate">{edu.field}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
