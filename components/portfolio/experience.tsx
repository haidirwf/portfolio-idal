"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { Server, Cpu, Gem } from "lucide-react";

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
  image?: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Freelance & Network Infrastructure",
    employmentType: "Freelance / Contract",
    roleId: "Network Engineer & Consultant",
    roleEn: "Network Engineer & Consultant",
    periodId: "2024 - Sekarang · 1 thn+",
    periodEn: "2024 - Present · 1 yr+",
    locationId: "Cikarang Selatan, Jawa Barat · Remote / On-site",
    locationEn: "South Cikarang, West Java · Remote / On-site",
    descId: "Bertanggung jawab atas perancangan topologi jaringan skala kecil-menengah, konfigurasi otomatisasi routing MikroTik (OSPF & MTCRE level), pengerasan keamanan firewall, dan penyediaan IPSec VPN Tunnel.",
    descEn: "Responsible for designing small-to-medium network topologies, configuring MikroTik routing automation (OSPF & MTCRE level), firewall security hardening, and IPSec VPN Tunnel provisioning.",
    skillsTextId: "MikroTik, MTCNA, MTCRE, OSPF, Firewall, IPSec VPN",
    skillsTextEn: "MikroTik, MTCNA, MTCRE, OSPF, Firewall, IPSec VPN",
    logoBg: "bg-primary/10 text-primary border-primary/20",
    icon: Server,
    image: "/projects/hyperscale.svg"
  },
  {
    company: "IDN Boarding School Network Lab",
    roleId: "Network & Systems Lab Engineer",
    roleEn: "Network & Systems Lab Engineer",
    employmentType: "Contract / Practical",
    periodId: "2023 - Sekarang · 2 thn",
    periodEn: "2023 - Present · 2 yrs",
    locationId: "Indonesia · On-site Lab",
    locationEn: "Indonesia · On-site Lab",
    descId: "Mengelola infrastruktur jaringan lab sekolah, merancang simulasi switching & routing bertingkat di Cisco Packet Tracer & GNS3, serta pemeliharaan server Linux lokal.",
    descEn: "Managing school lab network infrastructure, simulating multi-layer switching & routing on Cisco Packet Tracer & GNS3, and maintaining local Linux servers.",
    skillsTextId: "Cisco Packet Tracer, VLAN, STP, EtherChannel, Linux Server",
    skillsTextEn: "Cisco Packet Tracer, VLAN, STP, EtherChannel, Linux Server",
    logoBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: Cpu,
    image: "/projects/aether-engine-arch.svg"
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
            "Rekam jejak profesional, konsultasi jaringan, dan pengurusan lab infrastruktur.",
            "Professional track record, network consulting, and lab infrastructure management."
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
