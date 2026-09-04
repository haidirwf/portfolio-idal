"use client";

import { motion } from "motion/react";
import {
  Layers,
  Cpu,
  Server,
  Workflow,
  ShieldCheck,
  Globe,
  Terminal
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
  { name: "Network Simulator", category: "CPT • PNETLab • GNS3", icon: Cpu },
  { name: "OSPF & EIGRP", category: "Routing Protocols", icon: Workflow },
  { name: "BGP Inter-Domain", category: "Routing Protocols", icon: Globe },
  { name: "VLAN & Subnetting", category: "Switching & L2/L3", icon: Layers },
  { name: "Firewall & NAT", category: "Security Hardening", icon: ShieldCheck },
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
            "Perangkat jaringan, protokol routing, simulasi jaringan, dan sistem operasi yang dikuasai.",
            "Networking hardware, routing protocols, network simulation, and OS proficiency."
          )}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
        {TECH_STACK.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(25%-0.75rem)] min-w-[140px] max-w-[210px]"
            >
              <Card className="p-4 h-full border-border/80 bg-card/60 rounded-xl hover:bg-card/90 hover:border-primary/60 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center gap-2.5 group cursor-default">
                <Icon className="size-6 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                <span className="text-xs font-sans font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] font-sans text-muted-foreground font-medium">
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
