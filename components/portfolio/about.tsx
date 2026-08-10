"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { MapPin, ShieldCheck, GraduationCap, Award, CheckCircle2, Network, Cpu, Lock } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  const coreFocus = [
    {
      icon: Network,
      titleId: "Desain Topologi & Routing",
      titleEn: "Topology Design & Routing",
      descId: "OSPF Multi-Area, EIGRP Dual-Stack, BGP Peering, Subnetting & Inter-VLAN.",
      descEn: "Multi-Area OSPF, Dual-Stack EIGRP, BGP Peering, Subnetting & Inter-VLAN."
    },
    {
      icon: Lock,
      titleId: "Keamanan & VPN Tunneling",
      titleEn: "Security & VPN Tunneling",
      descId: "MikroTik RouterOS Firewall Hardening, NAT Rules, IPSec & Site-to-Site VPN.",
      descEn: "MikroTik Firewall Hardening, NAT Rules, IPSec & Site-to-Site VPN."
    },
    {
      icon: Cpu,
      titleId: "Simulasi & Emulasi Lab",
      titleEn: "Lab Simulation & Emulation",
      descId: "Cisco Packet Tracer, GNS3, L2/L3 Switching (RSTP, EtherChannel LACP).",
      descEn: "Cisco Packet Tracer, GNS3, L2/L3 Switching (RSTP, LACP EtherChannel)."
    }
  ];

  const certifications = [
    {
      code: "MTCNA",
      name: "MikroTik Certified Network Associate",
      id: "2601NA9959",
      period: "Jan 2026 – Jan 2029"
    },
    {
      code: "MTCRE",
      name: "MikroTik Certified Routing Engineer",
      id: "2601RE9976",
      period: "Jan 2026 – Jan 2029"
    }
  ];

  const education = [
    {
      school: "IDN Boarding School",
      field: t("Teknik Komputer dan Jaringan (TKJ)", "Computer and Network Engineering"),
      period: "2025 – 2028",
      status: t("Sedang Berjalan", "Active")
    },
    {
      school: "IDN Boarding School",
      field: t("SMP / Middle School", "Middle School"),
      period: "2022 – 2025",
      status: t("Lulus", "Graduated")
    }
  ];

  return (
    <section id="about" className="py-12 px-4 sm:px-6 space-y-8">
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

      {/* Modern Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {/* Main Profile Summary Card (Spans 2 columns on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 h-full"
        >
          <Card className="h-full border-border/80 bg-card/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-border transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                <MapPin className="size-3.5" />
                <span>Bekasi, Jawa Barat, Indonesia</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-sans text-foreground leading-snug">
                {t(
                  "Network Engineer yang berfokus pada infrastruktur jaringan enterprise yang aman, andal, dan skalabel.",
                  "Network Engineer focused on secure, reliable, and scalable enterprise network infrastructure."
                )}
              </h3>

              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
                {t(
                  "Spesialisasi mencakup perancangan topologi jaringan komputer, otomatisasi protokol routing dinamis MikroTik & Cisco, pengerasan sistem keamanan firewall, serta implementasi VPN tunnel.",
                  "Specializing in computer network topology design, MikroTik & Cisco dynamic routing protocol automation, firewall security hardening, and VPN tunnel implementations."
                )}
              </p>
            </div>

            {/* Core Specialization Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-border/40">
              {coreFocus.map((focus, idx) => {
                const IconComponent = focus.icon;
                return (
                  <div key={idx} className="p-3 rounded-2xl bg-secondary/40 border border-border/50 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold font-sans text-foreground">
                      <IconComponent className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{t(focus.titleId, focus.titleEn)}</span>
                    </div>
                    <p className="text-[11px] font-sans text-muted-foreground leading-snug line-clamp-2">
                      {t(focus.descId, focus.descEn)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Certifications Card (1 Column) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="h-full"
        >
          <Card className="h-full border-border/80 bg-card/60 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-border transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Award className="size-4 text-primary" />
                  <span>{t("Sertifikasi MikroTik", "MikroTik Certifications")}</span>
                </h3>
                <Badge variant="outline" className="font-mono text-[9px] bg-primary/10 text-primary border-primary/30">
                  Official
                </Badge>
              </div>

              <div className="space-y-2.5">
                {certifications.map((cert) => (
                  <div key={cert.code} className="p-3 rounded-2xl bg-secondary/30 border border-border/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold font-sans text-foreground">{cert.code}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{cert.period}</span>
                    </div>
                    <p className="text-xs font-sans text-muted-foreground font-medium leading-tight">{cert.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground/70">ID: {cert.id}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
              <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
              <span>{t("Verified Credential IDs", "Verified Credential IDs")}</span>
            </div>
          </Card>
        </motion.div>

        {/* Education Full Card (Spans all 3 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="md:col-span-3 w-full"
        >
          <Card className="border-border/80 bg-card/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs hover:border-border transition-all duration-300">
            <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-2">
              <GraduationCap className="size-4 text-primary" />
              <span>{t("Latar Belakang Pendidikan", "Education Background")}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-secondary/30 border border-border/50 flex items-center justify-between gap-3">
                  <div className="space-y-0.5 overflow-hidden">
                    <p className="text-xs sm:text-sm font-bold font-sans text-foreground truncate">{edu.school}</p>
                    <p className="text-xs font-sans text-muted-foreground truncate">{edu.field}</p>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <span className="text-xs font-mono text-muted-foreground block">{edu.period}</span>
                    <Badge variant="secondary" className="font-mono text-[9px] rounded-full">
                      {edu.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
