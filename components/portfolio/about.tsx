"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { Award, GraduationCap, Calendar } from "lucide-react";

export function About() {
  const { t } = useLanguage();

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
    { school: "IDN Boarding School", period: "2025 - 2028", field: t("Teknik Komputer dan Jaringan (TKJ)", "Computer and Network Engineering") },
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
            "Ringkasan profil, sertifikasi MikroTik, dan latar belakang pendidikan.",
            "Profile summary, MikroTik certifications, and education background."
          )}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border/80 bg-card/60 rounded-3xl p-6 sm:p-10 shadow-xs w-full space-y-6">
          {/* Ringkasan Profil Singkat & Padat */}
          <div className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">
              {t(
                "Network Engineer yang berfokus pada perancangan, otomatisasi routing MikroTik/Cisco, dan pengerasan keamanan jaringan (hardening) agar sistem terhubung secara andal dan efisien.",
                "Network Engineer specializing in network architecture design, MikroTik/Cisco routing automation, and infrastructure security hardening for high reliability."
              )}
            </p>
          </div>

          {/* Grid 2 Kolom Bersih: Certifications & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/40">
            {/* Certifications */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Award className="size-3.5 text-primary" />
                <span>{t("Sertifikasi Resmi", "Certifications")}</span>
              </h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.code} className="p-3 rounded-xl bg-secondary/30 border border-border/40 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold font-sans text-foreground">{cert.code} — {cert.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">ID: {cert.credentialId} · {cert.issued} - {cert.expires}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-2">
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
