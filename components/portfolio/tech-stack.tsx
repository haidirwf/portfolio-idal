"use client";

import { motion } from "motion/react";
import {
  Layers,
  Cpu,
  Server,
  Database,
  Box,
  Terminal,
  Cloud,
  Code2,
  Workflow,
  ShieldCheck,
  Container,
  Globe
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface TechItem {
  name: string;
  category: string;
  icon: React.ElementType;
}

const TECH_STACK: TechItem[] = [
  { name: "Next.js", category: "Frontend", icon: Layers },
  { name: "React", category: "Frontend", icon: Code2 },
  { name: "TypeScript", category: "Frontend", icon: Terminal },
  { name: "Tailwind CSS", category: "Frontend", icon: Workflow },
  { name: "Rust", category: "Systems", icon: Cpu },
  { name: "Go", category: "Backend", icon: Server },
  { name: "Laravel", category: "Backend", icon: Box },
  { name: "Supabase", category: "Database", icon: Database },
  { name: "Postgres", category: "Database", icon: Database },
  { name: "Docker", category: "DevOps", icon: Container },
  { name: "Mikrotik", category: "Networking", icon: Globe },
  { name: "Linux", category: "OS", icon: Terminal },
  { name: "Cloudflare", category: "Edge", icon: Cloud },
  { name: "Kubernetes", category: "DevOps", icon: ShieldCheck }
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-12 px-4 sm:px-6 space-y-8">
      <h2 className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
        Tech Stack
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
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
              <Card className="p-3 border-border/60 bg-card/30 hover:bg-card hover:border-border transition-all duration-200 flex flex-col items-center justify-center text-center gap-2 group">
                <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-mono font-medium text-foreground">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/70">
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
