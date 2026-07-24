"use client";

import { motion } from "motion/react";
import {
  Layers,
  Cpu,
  Server,
  Database,
  Terminal,
  Cloud,
  Workflow,
  ShieldCheck,
  Globe
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

interface TechItem {
  name: string;
  category: string;
  icon: React.ElementType;
}

const TECH_STACK: TechItem[] = [
  { name: "MikroTik RouterOS", category: "Routing & Switching", icon: Server },
  { name: "MTCNA & MTCRE", category: "Certification", icon: ShieldCheck },
  { name: "Cisco Packet Tracer", category: "Network Simulation", icon: Cpu },
  { name: "GNS3", category: "Network Emulation", icon: Cpu },
  { name: "OSPF & EIGRP", category: "Routing Protocols", icon: Workflow },
  { name: "BGP Inter-Domain", category: "Routing Protocols", icon: Globe },
  { name: "VLAN & Subnetting", category: "Switching & L2/L3", icon: Layers },
  { name: "Firewall & NAT", category: "Security Hardening", icon: ShieldCheck },
  { name: "IPSec VPN", category: "Tunneling & Encryption", icon: ShieldCheck },
  { name: "Linux Server", category: "OS & Infrastructure", icon: Terminal }
];

export function TechStack() {
  const { t } = useLanguage();

  return (
    <section id="tech-stack" className="py-12 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Keahlian & Perangkat", "Skills & Toolset")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Perangkat jaringan, protokol routing, sertifikasi MikroTik, dan sistem operasi yang dikuasai.",
            "Networking hardware, routing protocols, MikroTik certifications, and OS proficiency."
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {TECH_STACK.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
            >
              <Card className="p-4 border-border/80 bg-card/60 rounded-2xl hover:bg-card hover:border-border transition-all duration-300 flex flex-col items-center justify-center text-center gap-2.5 group">
                <Icon className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-sans font-semibold text-foreground">
                  {item.name}
                </span>
                <span className="text-[10px] font-sans text-muted-foreground">
                  {item.category}
                </span>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
