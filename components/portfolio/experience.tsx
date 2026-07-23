"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Aether Systems",
    position: "Senior Systems Engineer",
    period: "2024 — Present",
    description: "Led core infrastructure engineering for real-time edge caches and microservices. Improved 99th percentile API response times by 45%.",
    skills: ["Rust", "Tokio", "Docker", "Kubernetes", "Postgres"]
  },
  {
    company: "Vortex Labs",
    position: "Full-Stack Engineer",
    period: "2022 — 2024",
    description: "Architected telemetry dashboards and high-throughput ingestion pipelines handling 100M+ daily events with sub-second queries.",
    skills: ["Next.js", "TypeScript", "ClickHouse", "Go", "Tailwind"]
  },
  {
    company: "CloudScale Tech",
    position: "Backend Engineer",
    period: "2020 — 2022",
    description: "Developed API gateways and internal developer platform automation. Reduced infrastructure deployment failures by 80%.",
    skills: ["Laravel", "Supabase", "Redis", "Linux", "Docker"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-12 max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
      <h2 className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
        Experience
      </h2>

      <div className="relative border-l border-border/60 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 size-3 rounded-full bg-border group-hover:bg-primary group-hover:scale-125 transition-all duration-200" />

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold font-sans text-foreground">
                    {exp.position}
                  </h3>
                  <p className="text-sm font-mono text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground/80">{exp.period}</span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="font-mono text-[10px]">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
