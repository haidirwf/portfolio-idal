"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { MapPin, Award, GraduationCap, ShieldCheck } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  const certifications = [
    {
      code: "MTCNA",
      name: "MikroTik Certified Network Associate",
      id: "2601NA9959",
      period: "2026 – 2029"
    },
    {
      code: "MTCRE",
      name: "MikroTik Certified Routing Engineer",
      id: "2601RE9976",
      period: "2026 – 2029"
    }
  ];

  const education = [
    {
      school: "IDN Boarding School",
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

      {/* Grid 2 Kolom Bersih & Simetris */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Profile Card (Kiri) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Card className="h-full border-border/80 bg-card/60 rounded-xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-border transition-all duration-300">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
                <MapPin className="size-3.5" />
                <span>Bekasi, Jawa Barat, Indonesia</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold font-sans text-foreground leading-snug">
                {t(
                  "Network Engineer yang berfokus pada infrastruktur jaringan enterprise yang aman, andal, dan skalabel.",
                  "Network Engineer focused on secure, reliable, and scalable enterprise network infrastructure."
                )}
              </h3>

              <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                {t(
                  "Spesialisasi mencakup perancangan topologi jaringan komputer, otomatisasi protokol routing dinamis MikroTik & Cisco, pengerasan sistem keamanan firewall, serta implementasi VPN tunnel.",
                  "Specializing in computer network topology design, MikroTik & Cisco dynamic routing protocol automation, firewall security hardening, and VPN tunnel implementations."
                )}
              </p>
            </div>
          </Card>
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
          <Card className="border-border/80 bg-card/60 rounded-xl p-5 space-y-3 shadow-xs hover:border-border transition-all duration-300 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Award className="size-3.5 text-primary" />
                <span>{t("Sertifikasi", "Certifications")}</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div key={cert.code} className="p-2.5 rounded-lg bg-secondary/30 border border-border/40 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold font-sans text-foreground">{cert.code}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{cert.period}</span>
                  </div>
                  <p className="text-[11px] font-sans text-muted-foreground font-medium leading-tight truncate">{cert.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground/70">ID: {cert.id}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Education Box */}
          <Card className="border-border/80 bg-card/60 rounded-xl p-5 space-y-3 shadow-xs hover:border-border transition-all duration-300 flex-1">
            <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <GraduationCap className="size-3.5 text-primary" />
              <span>{t("Pendidikan", "Education")}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {education.map((edu, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-secondary/30 border border-border/40 space-y-0.5">
                  <p className="text-xs font-bold font-sans text-foreground truncate">{edu.school}</p>
                  <p className="text-[11px] font-sans text-muted-foreground truncate">{edu.field}</p>
                  <span className="text-[10px] font-mono text-muted-foreground/80 block">{edu.period}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
