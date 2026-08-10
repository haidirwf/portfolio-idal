"use client";

import { motion } from "motion/react";
import {
  Layers,
  Cpu,
  Server,
  Workflow,
  ShieldCheck,
  Globe,
  Terminal,
  Radio,
  Lock,
  Cable
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface TechBrand {
  name: string;
  category: string;
  icon: React.ElementType;
}

const TECH_BRANDS: TechBrand[] = [
  { name: "MikroTik RouterOS", category: "Routing & Switching", icon: Server },
  { name: "Cisco IOS", category: "Enterprise Hardware", icon: Cpu },
  { name: "MTCNA & MTCRE", category: "Certified Skill", icon: ShieldCheck },
  { name: "Cisco Packet Tracer", category: "Network Simulation", icon: Layers },
  { name: "GNS3", category: "Network Emulation", icon: Cable },
  { name: "OSPF & EIGRP", category: "Routing Protocols", icon: Workflow },
  { name: "BGP Peering", category: "Inter-Domain Routing", icon: Globe },
  { name: "VLAN & Subnetting", category: "Layer 2/3 Switching", icon: Radio },
  { name: "Firewall & NAT", category: "Security Hardening", icon: Lock },
  { name: "Linux Infrastructure", category: "OS & Server", icon: Terminal }
];

export function TechStack() {
  const { t } = useLanguage();

  return (
    <section id="tech-stack" className="py-16 px-4 sm:px-6 space-y-8 overflow-hidden">
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans">
          {t(
            "Digunakan dalam 10+ Topologi & Infrastruktur Jaringan Enterprise",
            "Used across 10+ Topologies & Enterprise Network Infrastructures"
          )}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans font-medium">
          {t(
            "Perangkat keras, protokol routing dinamis, simulasi, dan sistem pengerasan keamanan jaringan.",
            "Networking hardware, dynamic routing protocols, simulations, and security hardening systems."
          )}
        </p>
      </div>

      {/* Marquee Banner Logos Container (Persis shadcn.io university logo bar) */}
      <div className="relative w-full overflow-hidden pt-4 pb-2">
        {/* Gradient Blur Overlay Left & Right */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Infinite Moving Row */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-10 sm:gap-16 w-max"
        >
          {/* Double array for seamless loop */}
          {[...TECH_BRANDS, ...TECH_BRANDS].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none group shrink-0"
              >
                <IconComponent className="size-5 sm:size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-sans font-bold text-foreground/80 group-hover:text-foreground tracking-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground/70">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
