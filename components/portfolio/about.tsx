"use client";

import * as React from "react";
import Image from "next/image";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function About() {
  const { t } = useLanguage();

  const education = [
    {
      school: "IDN Boarding School Solo",
      field: t("Teknik Komputer dan Jaringan (TKJ)", "Computer & Network Engineering"),
      period: "2025 – 2028",
      current: true,
    },
    {
      school: "IDN Boarding School",
      field: t("SMP / Middle School", "Middle School"),
      period: "2022 – 2025",
      current: false,
    },
  ];

  return (
    <section id="about" className="py-8 sm:py-10 space-y-5 scroll-mt-16">
      {/* Head */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-primary font-semibold">06</span>
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
          {t("Latar Belakang & Pendidikan", "About & Education")}
        </h2>
      </div>

      {/* Intro Bio & Education List */}
      <div className="space-y-4">
        <p className="text-xs sm:text-[14px] leading-relaxed text-muted-foreground">
          {t(
            "Saya siswa aktif jurusan Teknik Komputer dan Jaringan (TKJ) di IDN Boarding School Solo. Tertarik mendalami arsitektur jaringan skala besar, otomatisasi konfigurasi router, serta investigasi keamanan paket data.",
            "I am an active Computer and Network Engineering (TKJ) student at IDN Boarding School Solo, deeply interested in large-scale network architecture, router configuration automation, and packet security analysis."
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-border bg-card/40 space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <GraduationCap className="size-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs sm:text-[13px] font-semibold text-foreground truncate">
                    {edu.school}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground shrink-0">
                  {edu.period}
                </span>
              </div>
              <p className="text-xs text-muted-foreground pl-5 truncate">
                {edu.field}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
