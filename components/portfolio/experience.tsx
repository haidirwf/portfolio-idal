"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { Share2, Rocket, Gem } from "lucide-react";

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
  logoBg: string;
  icon: React.ElementType;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    roleId: "Divisi Media (Media Division)",
    roleEn: "Media Division",
    company: "IDN Solo Student Council",
    employmentType: "Contract",
    periodId: "Mei 2026 - Sekarang · 3 bln",
    periodEn: "May 2026 - Present · 3 mos",
    locationId: "Karanganyar, Jawa Tengah, Indonesia · On-site",
    locationEn: "Karanganyar, Central Java, Indonesia · On-site",
    descId: "Bertanggung jawab mengelola publikasi digital resmi OSIS, hubungan masyarakat, dokumentasi acara, serta branding visual di seluruh platform media sosial.",
    descEn: "Responsible for managing the student council's official digital presence, public relations, event documentation, and visual branding across all social media platforms.",
    skillsTextId: "Media Sosial, Manfaat Konten, dan +3 keahlian",
    skillsTextEn: "Social Media, Content Management and +3 skills",
    logoBg: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: Share2
  },
  {
    roleId: "Pendiri (Founder)",
    roleEn: "Founder",
    company: "Luncur Tech",
    employmentType: "Full-time",
    periodId: "Jan 2026 - Sekarang · 7 bln",
    periodEn: "Jan 2026 - Present · 7 mos",
    locationId: "Indonesia · Hybrid",
    locationEn: "Indonesia · Hybrid",
    descId: "Pendiri dan pembangun di Luncur Tech.",
    descEn: "Founder, builder at Luncur Tech.",
    skillsTextId: "Pengembangan Web, Konsultasi IT, dan +1 keahlian",
    skillsTextEn: "Web Development, IT Consulting and +1 skill",
    logoBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: Rocket
  }
];

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-12 px-4 sm:px-6 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Pengalaman", "Experience")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Rekam jejak profesional, organisasi siswa, dan konsultasi teknologi.",
            "Professional track record, student organization, and tech consulting."
          )}
        </p>
      </div>

      <Card className="border-border/80 bg-card/60 rounded-3xl p-6 sm:p-10 shadow-xs w-full divide-y divide-border/40">
        {EXPERIENCES.map((exp, idx) => {
          const LogoIcon = exp.icon;
          return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`flex gap-4 sm:gap-5 ${idx !== 0 ? "pt-6" : ""} ${idx !== EXPERIENCES.length - 1 ? "pb-6" : ""}`}
            >
              {/* LinkedIn Style Company Avatar Icon */}
              <div className={`size-11 sm:size-12 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${exp.logoBg}`}>
                <LogoIcon className="size-5 sm:size-6" />
              </div>

              {/* Experience Details Content */}
              <div className="space-y-2 flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sans text-foreground leading-snug">
                    {t(exp.roleId, exp.roleEn)}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-medium text-foreground/90">
                    {exp.company} · <span className="text-muted-foreground font-normal">{exp.employmentType}</span>
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground pt-0.5">
                    {t(exp.periodId, exp.periodEn)}
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground/80">
                    {t(exp.locationId, exp.locationEn)}
                  </p>
                </div>

                {/* Job Summary */}
                <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
                  {t(exp.descId, exp.descEn)}
                </p>

                {/* LinkedIn Style Skills Footer */}
                <div className="flex items-center gap-1.5 pt-1 text-xs font-sans text-foreground/90 font-medium">
                  <Gem className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">{t(exp.skillsTextId, exp.skillsTextEn)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </Card>
    </section>
  );
}
