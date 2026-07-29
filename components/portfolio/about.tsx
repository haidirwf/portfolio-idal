"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { Award, GraduationCap, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  const highlights = [
    {
      titleId: "Desain & Routing",
      titleEn: "Design & Routing",
      descId: "OSPF Multi-Area, EIGRP Named Mode, BGP Peering, Subnetting & Inter-VLAN.",
      descEn: "Multi-Area OSPF, Named EIGRP, BGP Peering, Subnetting & Inter-VLAN."
    },
    {
      titleId: "Keamanan & Tunneling",
      titleEn: "Security & Tunneling",
      descId: "MikroTik RouterOS Firewall Hardening, NAT Rules, IPSec & Site-to-Site VPN.",
      descEn: "MikroTik Firewall Hardening, NAT Rules, IPSec & Site-to-Site VPN."
    },
    {
      titleId: "Simulasi & Infrastruktur",
      titleEn: "Simulation & Infrastructure",
      descId: "Cisco Packet Tracer, GNS3, Switching Layer 2/3 (RSTP, LACP EtherChannel).",
      descEn: "Cisco Packet Tracer, GNS3, L2/L3 Switching (RSTP, LACP EtherChannel)."
    }
  ];

  const certifications = [
    {
      name: "MikroTik Certified Network Associate",
      code: "MTCNA",
      credentialId: "2601NA9959",
      period: "Jan 2026 - Jan 2029"
    },
    {
      name: "MikroTik Certified Routing Engineer",
      code: "MTCRE",
      credentialId: "2601RE9976",
      period: "Jan 2026 - Jan 2029"
    }
  ];

  const education = [
    { school: "IDN Boarding School", period: "2025 - 2028", field: t("Teknik Komputer dan Jaringan", "Computer and Network Engineering") },
    { school: "IDN Boarding School", period: "2022 - 2025", field: t("SMP / Middle School", "Middle School") }
  ];

  return (
    <section id="about" className="py-12 px-4 sm:px-6 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Tentang Saya", "About Me")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Filosofi kerja, spesialisasi teknis, sertifikasi resmi, dan latar belakang pendidikan.",
            "Work philosophy, technical specialization, certifications, and education."
          )}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border/80 bg-card/60 rounded-3xl p-6 sm:p-10 shadow-xs w-full space-y-8">
          {/* Top Intro Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-primary">
              <MapPin className="size-3.5" />
              <span>Cikarang Selatan, Jawa Barat, Indonesia</span>
            </div>
            <p className="text-base sm:text-lg font-sans text-foreground/90 font-medium leading-relaxed">
              {t(
                "Saya adalah Network Engineer dengan fokus pada pembangunan infrastruktur jaringan komputer yang aman, andal, dan skalabel. Berpengalaman mengonfigurasi perangkat MikroTik & Cisco untuk kebutuhan enterprise.",
                "Network Engineer dedicated to building secure, reliable, and scalable computer network infrastructure. Experienced in configuring MikroTik & Cisco enterprise gear."
              )}
            </p>
          </div>

          {/* Core Technical Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/40">
            {highlights.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-secondary/30 border border-border/40 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold font-sans text-foreground">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <span>{t(item.titleId, item.titleEn)}</span>
                </div>
                <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                  {t(item.descId, item.descEn)}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Grid: Certifications & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/40">
            {/* Certifications */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Award className="size-3.5 text-primary" />
                <span>{t("Sertifikasi Resmi MikroTik", "Official MikroTik Certifications")}</span>
              </h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.code} className="p-3 rounded-xl bg-secondary/30 border border-border/40 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-sans text-foreground">{cert.code}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">({cert.name})</span>
                      </div>
                      <p className="text-[10px] font-mono text-muted-foreground/80">Credential ID: {cert.credentialId}</p>
                    </div>
                    <Badge variant="outline" className="font-mono text-[9px] shrink-0 bg-primary/10 text-primary border-primary/30">
                      {cert.period}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <GraduationCap className="size-3.5 text-primary" />
                <span>{t("Pendidikan", "Education")}</span>
              </h3>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="p-3 rounded-xl bg-secondary/30 border border-border/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold font-sans text-foreground">{edu.school}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{edu.field}</p>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
