"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { Award, GraduationCap, Calendar, ShieldCheck } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  const skills = [
    {
      category: t("Infrastruktur Jaringan", "Network Infrastructure"),
      items: [
        "MikroTik (MTCNA, MTCRE)",
        "Routing Protocols (OSPF, EIGRP, BGP)",
        "VLAN & Inter-VLAN Routing",
        "Subnetting & IP Addressing",
        "Network Troubleshooting & Diagnostics",
        "Firewall Rules & Security Hardening",
        "IPSec & VPN Tunneling",
        "Switching (STP, RSTP, EtherChannel)"
      ]
    }
  ];

  const certifications = [
    {
      name: "MikroTik Certified Network Associate",
      code: "MTCNA",
      issuer: "MikroTik",
      credentialId: "2601NA9959",
      issued: "Jan 2026",
      expires: "Jan 2029",
      badgeColor: "bg-primary/10 text-primary border-primary/30"
    },
    {
      name: "MikroTik Certified Routing Engineer",
      code: "MTCRE",
      issuer: "MikroTik",
      credentialId: "2601RE9976",
      issued: "Jan 2026",
      expires: "Jan 2029",
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
    }
  ];

  const education = [
    { school: "IDN Boarding School", period: "June 2025 - June 2028", field: t("Teknik Komputer dan Jaringan (TKJ)", "Computer and Network Engineering") },
    { school: "IDN Boarding School", period: "June 2022 - June 2025", field: t("SMP / Middle School", "Middle School") }
  ];

  return (
    <section id="about" className="py-12 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Tentang Saya", "About Me")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Ringkasan profesional, keahlian teknis TKJ, sertifikasi MikroTik, dan latar belakang pendidikan.",
            "Professional summary, TKJ technical skills, MikroTik certifications, and educational background."
          )}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border/80 bg-card/60 rounded-3xl p-8 sm:p-12 shadow-xs w-full space-y-8">
          {/* Summary Text */}
          <div className="space-y-4 text-base sm:text-lg font-sans text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">
              {t(
                "Sebagai Network Engineer spesialis Teknik Komputer dan Jaringan (TKJ), saya berfokus pada pembangunan, pengolahan, dan pengamanan sistem jaringan komputer yang efisien, andal, dan skalabel.",
                "As a Network Engineer specializing in Computer and Network Engineering (TKJ), I focus on building, managing, and securing efficient, reliable, and scalable network systems."
              )}
            </p>
            <p>
              {t(
                "Saya terbiasa bekerja dengan router MikroTik, perangkat Cisco, protokol routing dinamis, serta pengerasan keamanan jaringan (hardening). Latar belakang teknis saya mencakup routing, switching Layer 2/Layer 3, pengalamatan IP, dan troubleshooting jaringan mendalam.",
                "I work extensively with MikroTik routers, Cisco hardware, dynamic routing protocols, and network security hardening. My technical background encompasses routing, Layer 2/Layer 3 switching, IP addressing, and deep network troubleshooting."
              )}
            </p>
          </div>

          {/* Certifications & Education Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40">
            {/* Certifications */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-2">
                <Award className="size-4 text-primary" />
                <span>{t("Sertifikasi Resmi MikroTik", "Official MikroTik Certifications")}</span>
              </h3>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.code} className="p-3.5 rounded-xl bg-secondary/40 border border-border/50 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold font-sans text-foreground leading-snug">{cert.name}</p>
                        <p className="text-[11px] font-mono text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <Badge variant="outline" className={`font-mono text-[10px] shrink-0 ${cert.badgeColor}`}>
                        {cert.code}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/30 gap-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>Issued: {cert.issued} · Exp: {cert.expires}</span>
                      </span>
                      <span className="text-foreground/80 font-semibold">
                        ID: {cert.credentialId}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-2">
                <GraduationCap className="size-4 text-primary" />
                <span>{t("Pendidikan", "Education")}</span>
              </h3>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-secondary/40 border border-border/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold font-sans text-foreground">{edu.school}</p>
                      <span className="text-[10px] font-mono text-muted-foreground">{edu.period}</span>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground">{edu.field}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Skills List */}
          <div className="pt-4 border-t border-border/40 space-y-3">
            <h3 className="text-sm font-bold font-sans uppercase tracking-wider text-foreground">
              {t("Keahlian Utama TKJ (Technical Skills)", "TKJ Technical Skills")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.flatMap((s) => s.items).map((item) => (
                <span key={item} className="px-3 py-1 rounded-full text-xs font-mono bg-secondary/60 text-foreground border border-border/50">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
