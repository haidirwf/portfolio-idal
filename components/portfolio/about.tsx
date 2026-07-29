"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { Award, GraduationCap, MapPin } from "lucide-react";

export function About() {
  const { t } = useLanguage();

  const certifications = [
    { code: "MTCNA", name: "MikroTik Certified Network Associate", id: "2601NA9959", period: "2026 - 2029" },
    { code: "MTCRE", name: "MikroTik Certified Routing Engineer", id: "2601RE9976", period: "2026 - 2029" }
  ];

  const education = [
    { school: "IDN Boarding School", field: t("Teknik Komputer dan Jaringan", "Computer and Network Engineering"), period: "2025 - 2028" },
    { school: "IDN Boarding School", field: t("SMP / Middle School", "Middle School"), period: "2022 - 2025" }
  ];

  return (
    <section id="about" className="py-10 px-4 sm:px-6 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Tentang Saya", "About Me")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Profil ringkas, sertifikasi MikroTik, dan latar belakang pendidikan.",
            "Short profile, MikroTik certifications, and education background."
          )}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border/80 bg-card/60 rounded-3xl p-6 sm:p-8 shadow-xs w-full space-y-6">
          {/* Ringkasan Profil 2 Kalimat Bersih */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-primary">
              <MapPin className="size-3.5" />
              <span>Bekasi, Jawa Barat, Indonesia</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-foreground/90 font-medium leading-relaxed">
              {t(
                "Network Engineer yang berfokus pada perancangan infrastruktur jaringan komputer, otomatisasi routing MikroTik/Cisco, dan pengerasan keamanan sistem.",
                "Network Engineer specializing in network infrastructure design, MikroTik/Cisco routing automation, and system security hardening."
              )}
            </p>
          </div>

          {/* Grid 2 Kolom Bersih: Certifications & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/40">
            {/* Certifications */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-sans uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Award className="size-3.5 text-primary" />
                <span>{t("Sertifikasi Resmi", "Certifications")}</span>
              </h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.code} className="p-3 rounded-xl bg-secondary/30 border border-border/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold font-sans text-foreground">{cert.code} · <span className="text-[11px] font-normal text-muted-foreground">{cert.name}</span></p>
                      <p className="text-[10px] font-mono text-muted-foreground/80">ID: {cert.id}</p>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">{cert.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
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
