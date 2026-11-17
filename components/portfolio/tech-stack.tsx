"use client";

import * as React from "react";
import { useLanguage } from "@/components/language-provider";
import {
  Server,
  Cpu,
  Workflow,
  Globe,
  Layers,
  ShieldCheck,
  Network,
  Terminal,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ElementType;
}

const TECH_ITEMS: TechItem[] = [
  { name: "MikroTik RouterOS", category: "Routing & Switching", icon: Server },
  { name: "Cisco IOS", category: "Enterprise Routers & Switches", icon: Cpu },
  { name: "OSPF & EIGRP", category: "Dynamic Routing Protocols", icon: Workflow },
  { name: "BGP Inter-Domain", category: "Exterior Routing", icon: Globe },
  { name: "VLAN & Trunking", category: "802.1Q Subinterfaces", icon: Layers },
  { name: "ACL & Security", category: "Packet Filtering & Hardening", icon: ShieldCheck },
  { name: "CPT & GNS3", category: "Network Emulators", icon: Network },
  { name: "Linux Server", category: "Debian & Ubuntu Infrastructure", icon: Terminal },
];

export function TechStack() {
  const { t } = useLanguage();

  return (
    <section id="tech-stack" className="py-8 sm:py-10 space-y-5 scroll-mt-16">
      {/* Head */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-primary font-semibold">03</span>
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
          {t("Keahlian & Perangkat", "How I Work")}
        </h2>
      </div>

      {/* Stack Summary Line (matching sumit-pfp's stackLine) */}
      <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-muted-foreground">
        {t("Sebagian besar berfokus pada ", "Mostly focused on ")}
        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-secondary/50 text-foreground font-medium text-xs">
          MikroTik RouterOS
        </span>
        {", "}
        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-secondary/50 text-foreground font-medium text-xs">
          Cisco IOS
        </span>
        {t(" dan ", " and ")}
        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-secondary/50 text-foreground font-medium text-xs">
          Linux
        </span>
        {t(", disimulasikan menggunakan ", ", simulated with ")}
        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-secondary/50 text-foreground font-medium text-xs">
          Cisco Packet Tracer
        </span>
        {", "}
        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-secondary/50 text-foreground font-medium text-xs">
          GNS3
        </span>
        {t(", serta analisis trafik mendalam via ", ", and packet analysis via ")}
        <span className="inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-secondary/50 text-foreground font-medium text-xs">
          Wireshark
        </span>
        {"."}
      </p>

      {/* Compact Tool Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {TECH_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="p-3 rounded-lg border border-border/80 bg-secondary/30 hover:bg-secondary/60 hover:border-border transition-colors space-y-1"
            >
              <div className="flex items-center gap-2">
                <Icon className="size-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs font-semibold text-foreground truncate">
                  {item.name}
                </span>
              </div>
              <p className="text-[10.5px] text-muted-foreground truncate font-mono">
                {item.category}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
