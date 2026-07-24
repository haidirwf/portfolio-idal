"use client";

import Image from "next/image";
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
  image: string;
  imageCaptionId: string;
  imageCaptionEn: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Freelance & Network Infrastructure",
    roleId: "Network Engineer & Consultant",
    roleEn: "Network Engineer & Consultant",
    period: "2024 — Present",
    descId: "Merancang dan mengonfigurasi jaringan skala kecil hingga menengah, otomatisasi routing MikroTik (OSPF, MTCRE level), firewall hardening, serta penyediaan VPN Site-to-Site.",
    descEn: "Designing and configuring small to medium scale networks, MikroTik routing automation (OSPF, MTCRE level), firewall hardening, and Site-to-Site VPN provisioning.",
    skills: ["MikroTik", "MTCNA", "MTCRE", "OSPF", "Firewall", "IPSec"],
    image: "/projects/hyperscale.svg",
    imageCaptionId: "Dokumentasi Topologi & Gateway Firewall MikroTik",
    imageCaptionEn: "MikroTik Gateway & Firewall Topology Documentation"
  },
  {
    company: "IDN Boarding School Network Lab",
    roleId: "Network & Systems Lab Engineer",
    roleEn: "Network & Systems Lab Engineer",
    period: "2023 — Present",
    descId: "Mengelola topologi jaringan lab sekolah, simulasi switching & routing bertingkat pada Cisco Packet Tracer & GNS3, serta pemeliharaan server lokal.",
    descEn: "Managing school lab network topologies, simulating multi-layer switching & routing on Cisco Packet Tracer & GNS3, and local server maintenance.",
    skills: ["Cisco Packet Tracer", "VLAN", "STP", "EtherChannel", "Linux"],
    image: "/projects/aether-engine-arch.svg",
    imageCaptionId: "Cisco Packet Tracer Lab & Switch Infrastructure Diagram",
    imageCaptionEn: "Cisco Packet Tracer Lab & Switch Infrastructure Diagram"
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
            "Rekam jejak implementasi jaringan, simulasi topologi Cisco, dan pengerasan keamanan.",
            "Track record of network deployments, Cisco topology simulations, and security hardening."
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
            <Card className="border-border/80 bg-card/60 rounded-2xl p-6 sm:p-8 hover:bg-card transition-all duration-300 space-y-4">
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

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="font-mono text-[10px] rounded-md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* LinkedIn Style Media Attachment Thumbnail */}
              <div className="pt-2 border-t border-border/40">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors group cursor-pointer">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-border/40 bg-secondary/40">
                    <Image
                      src={exp.image}
                      alt={exp.company}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <p className="text-xs font-sans font-semibold text-foreground truncate">
                      {t(exp.imageCaptionId, exp.imageCaptionEn)}
                    </p>
                    <p className="text-[11px] font-mono text-muted-foreground">Media Attachment · Documentation</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
