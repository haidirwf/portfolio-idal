"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { GitBranch, ExternalLink } from "lucide-react";
import { Project } from "@/lib/projects";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

export function Showcase({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
          {t("Topologi & Proyek Jaringan", "Network Topologies & Works")}
        </h2>
        <p className="text-sm text-muted-foreground font-sans">
          {t(
            "Arsitektur jaringan enterprise, simulasi Cisco Packet Tracer, dan manajemen edge MikroTik.",
            "Enterprise network architecture, Cisco Packet Tracer simulations, and MikroTik edge management."
          )}
        </p>
      </div>

      {/* Responsive Grid: Desktop 3 col, Tablet 2 col, Mobile 1 col */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Card className="h-full flex flex-col justify-between overflow-hidden border-border/80 bg-card/60 rounded-2xl p-2.5 hover:bg-card hover:shadow-md transition-all duration-300 group">
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl bg-secondary/40 overflow-hidden border border-border/40">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-xs text-[10px] font-mono text-muted-foreground border border-border/50">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span>{project.year}</span>
                  </div>
                </div>

                <div className="px-3 pt-1 space-y-1.5">
                  <CardTitle className="text-base font-bold font-sans tracking-tight">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:underline flex items-center justify-between group-hover:text-primary transition-colors"
                    >
                      <span>{project.title}</span>
                    </Link>
                  </CardTitle>

                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </div>
              </div>

              <div className="p-3 pt-2 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/80 text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-border/40 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <GitBranch className="size-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-sans font-medium text-foreground hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
