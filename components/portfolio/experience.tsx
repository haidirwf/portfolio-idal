"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { MapPin, Calendar, Briefcase, Gem, Sparkles } from "lucide-react";

interface ExperienceItem {
  company: string;
  employmentType: string;
  roleId: string;
  roleEn: string;
  periodId: string;
  periodEn: string;
  locationId: string;
  locationEn: string;
  descId: string;
  descEn: string;
  skillsTextId: string;
  skillsTextEn: string;
  logo: string;
  tags: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    roleId: "Divisi Media (Media Division)",
    roleEn: "Media Division",
    company: "IDN Solo Student Council",
    employmentType: "Contract",
    periodId: "Mei 2026 – Sekarang · 3 bln",
    periodEn: "May 2026 – Present · 3 mos",
    locationId: "Karanganyar, Jawa Tengah · On-site",
    locationEn: "Karanganyar, Central Java · On-site",
    descId: "Bertanggung jawab mengelola publikasi digital resmi OSIS, hubungan masyarakat, dokumentasi acara, serta branding visual di seluruh platform media sosial.",
    descEn: "Responsible for managing the student council's official digital presence, public relations, event documentation, and visual branding across all social media platforms.",
    skillsTextId: "Media Sosial, Content Management, Event Branding",
    skillsTextEn: "Social Media, Content Management, Event Branding",
    logo: "/experience/issc.webp",
    tags: ["Digital Branding", "Public Relations", "Event Management"]
  },
  {
    roleId: "Pendiri (Founder)",
    roleEn: "Founder",
    company: "Luncur Tech",
    employmentType: "Full-time",
    periodId: "Jan 2026 – Sekarang · 7 bln",
    periodEn: "Jan 2026 – Present · 7 mos",
    locationId: "Indonesia · Hybrid",
    locationEn: "Indonesia · Hybrid",
    descId: "Pendiri dan pembangun infrastruktur serta layanan konsultasi teknologi di Luncur Tech.",
    descEn: "Founder and builder of tech infrastructure & IT consulting services at Luncur Tech.",
    skillsTextId: "Pengembangan Web, Konsultasi IT, Arsitektur Sistem",
    skillsTextEn: "Web Development, IT Consulting, System Architecture",
    logo: "/experience/luncur.webp",
    tags: ["IT Consulting", "Infrastructure", "Leadership"]
  }
];

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-12 px-4 sm:px-6 space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Pengalaman", "Experience")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Rekam jejak kepemimpinan, organisasi siswa, dan konsultasi infrastruktur teknologi.",
            "Leadership track record, student organization, and IT infrastructure consulting."
          )}
        </p>
      </div>

      {/* Grid of Distinct Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="h-full"
          >
            <Card className="h-full border-border/80 bg-card/60 rounded-xl p-6 flex flex-col justify-between space-y-5 shadow-xs">
              <div className="space-y-4">
                {/* Header Row: Company Logo + Period Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 rounded-lg overflow-hidden border border-border/60 bg-background shrink-0 p-1 flex items-center justify-center">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain p-1 rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-sans text-foreground leading-snug">
                        {t(exp.roleId, exp.roleEn)}
                      </h3>
                      <p className="text-xs font-sans font-semibold text-foreground/80">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <Badge variant="outline" className="font-mono text-[10px] bg-secondary/50 shrink-0">
                    {exp.employmentType}
                  </Badge>
                </div>

                {/* Metadata Row: Period & Location */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-muted-foreground border-y border-border/40 py-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3 text-muted-foreground" />
                    <span>{t(exp.periodId, exp.periodEn)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3 text-muted-foreground" />
                    <span>{t(exp.locationId, exp.locationEn)}</span>
                  </div>
                </div>

                {/* Job Description */}
                <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                  {t(exp.descId, exp.descEn)}
                </p>
              </div>

              {/* Footer: Tags & Key Skills */}
              <div className="space-y-2.5 pt-2">
                <div className="flex flex-wrap gap-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/80 text-muted-foreground border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-sans text-foreground/90 font-medium pt-1">
                  <Gem className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">{t(exp.skillsTextId, exp.skillsTextEn)}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
