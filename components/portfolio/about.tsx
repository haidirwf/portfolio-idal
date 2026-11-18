"use client";

import * as React from "react";
import { useLanguage } from "@/components/language-provider";

interface EducationMilestone {
  school: string;
  degreeId: string;
  degreeEn: string;
  stageId: string;
  stageEn: string;
  period: string;
  status: "current" | "completed";
  descriptionId: string;
  descriptionEn: string;
  highlights: string[];
}

const EDUCATION_ROADMAP: EducationMilestone[] = [
  {
    school: "IDN Boarding School Solo",
    degreeId: "SMK Teknik Komputer dan Jaringan (TKJ)",
    degreeEn: "Vocational High School · Computer & Network Engineering",
    stageId: "Fase Spesialisasi & Sertifikasi",
    stageEn: "Specialization & Certifications",
    period: "2025 – 2028",
    status: "current",
    descriptionId:
      "Fokus mendalami arsitektur jaringan skala enterprise, routing dinamis multi-area (OSPF & BGP), switching Cisco IOS, perolehan sertifikasi MikroTik (MTCNA & MTCRE), serta otomatisasi infrastruktur dan analisis paket data.",
    descriptionEn:
      "Focused on enterprise-scale network architecture, multi-area dynamic routing (OSPF & BGP), Cisco IOS switching, official MikroTik certifications (MTCNA & MTCRE), and network automation & packet security.",
    highlights: ["MikroTik RouterOS", "Cisco IOS", "OSPF & BGP", "Network Security", "Linux Server"],
  },
  {
    school: "IDN Boarding School",
    degreeId: "Sekolah Menengah Pertama (SMP)",
    degreeEn: "Junior High School",
    stageId: "Fase Fondasi & Eksplorasi IT",
    stageEn: "IT Foundations & Exploration",
    period: "2022 – 2025",
    status: "completed",
    descriptionId:
      "Membangun fondasi logika komputasi, pemahaman konsep dasar jaringan komputer dan internet, pengenalan sistem operasi Linux, serta pembentukan karakter disiplin dan kepemimpinan di lingkungan pesantren.",
    descriptionEn:
      "Built computational logic foundations, core computer networking and internet fundamentals, Linux operating systems introduction, and disciplined leadership character in a boarding environment.",
    highlights: ["IT Fundamentals", "Basic Networking", "Computer Logic", "Linux Basics"],
  },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-8 sm:py-10 space-y-6 scroll-mt-16">
      {/* Head */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-primary font-semibold">07</span>
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
          {t("Latar Belakang & Pendidikan", "About & Education")}
        </h2>
      </div>

      {/* Intro Bio */}
      <p className="text-xs sm:text-[14px] leading-relaxed text-muted-foreground">
        {t(
          "Saya siswa aktif jurusan Teknik Komputer dan Jaringan (TKJ) di IDN Boarding School Solo. Tertarik mendalami arsitektur jaringan skala besar, otomatisasi konfigurasi router, serta investigasi keamanan paket data.",
          "I am an active Computer and Network Engineering (TKJ) student at IDN Boarding School Solo, deeply interested in large-scale network architecture, router configuration automation, and packet security analysis."
        )}
      </p>

      {/* Roadmap Timeline */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
            {t("Roadmap Pendidikan", "Education Roadmap")}
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <div className="relative pl-6 sm:pl-7 border-l border-border ml-2.5 sm:ml-3 space-y-7 pt-2">
          {EDUCATION_ROADMAP.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 sm:-left-7 top-1.5 -translate-x-1/2 size-2.5 rounded-full border-2 border-background transition-colors ${
                  item.status === "current"
                    ? "bg-primary ring-2 ring-primary/20"
                    : "bg-muted-foreground/40"
                }`}
                aria-hidden="true"
              />

              <div className="space-y-1.5">
                {/* Row 1: School + Status Badge + Period */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-[15px] font-semibold text-foreground">
                      {item.school}
                    </span>

                    {item.status === "current" ? (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary font-semibold">
                        {t("Sekarang", "Present")}
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-secondary/80 border border-border text-muted-foreground">
                        {t("Selesai", "Completed")}
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    {item.period}
                  </span>
                </div>

                {/* Row 2: Degree / Stage */}
                <p className="text-xs sm:text-[13px] font-medium text-foreground">
                  {t(item.degreeId, item.degreeEn)}
                  <span className="text-muted-foreground font-normal">
                    {" "}· {t(item.stageId, item.stageEn)}
                  </span>
                </p>

                {/* Row 3: Description */}
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-muted-foreground max-w-2xl pt-0.5">
                  {t(item.descriptionId, item.descriptionEn)}
                </p>

                {/* Row 4: Highlights / Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {item.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded-md border border-border/60 bg-secondary/30 text-[11px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
