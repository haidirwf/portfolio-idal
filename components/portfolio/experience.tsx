"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";

interface ExperienceItem {
  company: string;
  roleId: string;
  roleEn: string;
  period: string;
  descId: string;
  descEn: string;
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Freelance & Individual Projects",
    roleId: "Network Engineer & Consultant",
    roleEn: "Network Engineer & Consultant",
    period: "2024 — Present",
    descId: "Merancang dan mengonfigurasi jaringan skala kecil hingga menengah, otomatisasi routing MikroTik (OSPF, MTCRE level), firewall hardening, serta penyediaan VPN Site-to-Site.",
    descEn: "Designing and configuring small to medium scale networks, MikroTik routing automation (OSPF, MTCRE level), firewall hardening, and Site-to-Site VPN provisioning.",
    skills: ["MikroTik", "MTCNA", "MTCRE", "OSPF", "Firewall", "IPSec"]
  },
  {
    company: "IDN Boarding School Network Lab",
    roleId: "Network & Systems Lab Engineer",
    roleEn: "Network & Systems Lab Engineer",
    period: "2023 — Present",
    descId: "Mengelola topologi jaringan lab sekolah, simulasi switching & routing bertingkat pada Cisco Packet Tracer & GNS3, serta pemeliharaan server lokal.",
    descEn: "Managing school lab network topologies, simulating multi-layer switching & routing on Cisco Packet Tracer & GNS3, and local server maintenance.",
    skills: ["Cisco Packet Tracer", "VLAN", "STP", "EtherChannel", "Linux"]
  },
  {
    company: "UI/UX & Creative Projects",
    roleId: "UI/UX & Product Designer",
    roleEn: "UI/UX & Product Designer",
    period: "2023 — Present",
    descId: "Merancang antarmuka aplikasi web dan mobile yang bersih dan responsif menggunakan Figma dan Canva dengan fokus pada kemudahan pengguna (usability).",
    descEn: "Designing clean, responsive web and mobile application interfaces using Figma and Canva with a strong focus on usability.",
    skills: ["Figma", "Canva", "UI/UX Design", "Wireframing", "Prototyping"]
  }
];

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-12 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Pengalaman & Proyek", "Experience & Projects")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Rekam jejak implementasi jaringan, pengerasan keamanan, dan desain antarmuka digital.",
            "Track record of network deployments, security hardening, and interface design."
          )}
        </p>
      </div>

      <div className="space-y-4 w-full">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
          >
            <Card className="border-border/80 bg-card/60 rounded-2xl p-6 sm:p-8 hover:bg-card transition-all duration-300">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/40 pb-3">
                  <div>
                    <h3 className="text-lg font-bold font-sans text-foreground">
                      {t(exp.roleId, exp.roleEn)}
                    </h3>
                    <p className="text-sm font-sans font-medium text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/80 px-2.5 py-1 rounded-full bg-secondary/50 border border-border/40 w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(exp.descId, exp.descEn)}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="font-mono text-[10px] rounded-md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
