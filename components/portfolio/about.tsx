"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { Award, GraduationCap } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  const skills = [
    { category: t("Jaringan", "Network Engineering"), items: ["MikroTik (MTCNA, MTCRE)", "Routing Protocols (OSPF, EIGRP, BGP)", "VLAN & Subnetting", "Network Troubleshooting", "Firewall & Security Hardening"] },
    { category: t("Desain & UI/UX", "UI/UX & Graphic Design"), items: ["Figma", "Canva", "Clean UI Design", "Usability & Wireframing"] }
  ];

  const education = [
    { school: "IDN Boarding School", period: "June 2025 - June 2028", field: t("Teknik Komputer dan Jaringan", "Computer and Network Engineering") },
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
            "Ringkasan profesional, keahlian utama, sertifikasi, dan latar belakang pendidikan.",
            "Professional summary, key skills, certifications, and educational background."
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
                "Sebagai Network Engineer yang menyukai infrastruktur aman dan desain digital intuitif, saya berspesialisasi dalam membangun serta mengelola sistem jaringan yang efisien, andal, dan skalabel.",
                "As a Network Engineer with a passion for secure infrastructure and intuitive digital design, I specialize in building and managing efficient, reliable, and scalable network systems."
              )}
            </p>
            <p>
              {t(
                "Saya terbiasa bekerja dengan MikroTik, protokol jaringan, dan platform cloud untuk menciptakan konfigurasi optimal yang mendukung performa dan keamanan. Latar belakang teknis saya mencakup routing, pengalamatan IP, serta pengerasan keamanan jaringan (hardening).",
                "I work with tools like MikroTik, networking protocols, and cloud platforms to create optimized setups that support both performance and security. My technical background includes experience in routing, IP addressing, and network troubleshooting."
              )}
            </p>
            <p>
              {t(
                "Di sisi kreatif, saya juga seorang desainer UI/UX menggunakan Figma dan Canva untuk merancang antarmuka yang bersih dan ramah pengguna.",
                "On the creative side, I also work as a UI/UX designer using tools like Figma and Canva to design clean, user-friendly interfaces that enhance usability."
              )}
            </p>
          </div>

          {/* Certifications & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/40">
            {/* Certifications */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-2">
                <Award className="size-4 text-primary" />
                <span>{t("Sertifikasi Resmi", "Certifications")}</span>
              </h3>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-secondary/40 border border-border/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold font-mono text-foreground">MikroTik Certified Network Associate</p>
                    <p className="text-[11px] font-mono text-muted-foreground">MTCNA</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/30">Verified</Badge>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border/50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold font-mono text-foreground">MikroTik Certified Routing Engineer</p>
                    <p className="text-[11px] font-mono text-muted-foreground">MTCRE</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-500 border-emerald-500/30">Verified</Badge>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-2">
                <GraduationCap className="size-4 text-primary" />
                <span>{t("Pendidikan", "Education")}</span>
              </h3>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="p-3 rounded-xl bg-secondary/40 border border-border/50 space-y-1">
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
              {t("Keahlian Utama (Top Skills)", "Top Skills")}
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
